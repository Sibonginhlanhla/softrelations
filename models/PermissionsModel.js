const Database = require('better-sqlite3');
const DB_NAME = './models/database/srdatabase.sqlite';

/**
 * Schema for Permissions
 */

module.exports = class PermissionsModel{
    #db; // private 

    constructor(){
        this.#db = new Database(DB_NAME);
        console.log("db connected, from PermissionsModel");
    }
    isUserBlocked(_userId){
        let query = "SELECT * FROM newpermissions WHERE userId=? AND permission=? AND revoked!=0";
        let blockedUser = this.#db.prepare(query).get(_userId, "BLOCK");
        if (blockedUser)
            return true;
        return false;
    }
    
    isRestrictedEndpoint(_url, _method){
        const query = "SELECT * FROM defaultpermissions WHERE apiPathSubDir=? AND httpMethod=?";
        let restrictedEndpoint = this.#db.prepare(query).get(_url, _method);
        if (restrictedEndpoint){
            return true;
        }
        return false;
    }
    isPermissionAllowed(_userId, _permissionName){
        const query = "SELECT * FROM newpermissions WHERE revoked!=0 AND userId=? AND permission=?";
        let revokedPermission = this.#db.prepare(query).get(_userId, _permissionName);
        if (revokedPermission)
            return false;
        return true;
    }

    /**
     * Returns true if user has permission to access endpoint
     */
    hasEndpointPermission(_userId, _role, _url, _method){
        // ordered by strength/precedence of the permission!

        // 1. check for BLOCK [newpermissions]
        if (this.isUserBlocked(_userId))
            return false;

        // 2. Now check if not restricted endpoint, then used to access permission name!
        let restrictedEndpoint = this.isRestrictedEndpoint(_url,_method);
        if (!restrictedEndpoint){
            return true;
        }
        // Endpoint is RESTRICTED here
        // 3. check if permission revoked/allowed for a user ('bypass' role) [newpermissions]
        let query = "SELECT * FROM defaultpermissions WHERE apiPathSubDir=? AND httpMethod=?";
        restrictedEndpoint = this.#db.prepare(query).get(_url, _method);
        query = "SELECT * FROM newpermissions WHERE revoked!=0 AND userId=? AND permission=?";
        let revokedPermission = restrictedEndpoint ? this.#db.prepare(query).get(_userId, restrictedEndpoint.permission) : false;
        if (!revokedPermission)
            return true;

        // 4. check if role is allowed [defaultpermissions]
        query = "SELECT * FROM defaultpermissions WHERE permission=? AND roleName=?";
        let roleRestrictedEndpoint = this.#db.prepare(query).get(restrictedEndpoint.permission, _role);
        if (roleRestrictedEndpoint)
            return true;

        console.log("no access!")
        return false;
    }

    /**
     * Returns special permissions(Names) user has access to */
    userGrantedPermissions(_userId, _roleName){
        let grantedPermissions = []

        let query = "SELECT * FROM newpermissions WHERE userId=? AND revoked=0 AND permission!='BLOCK'"
        let permissions = this.#db.prepare(query).all(_userId)
        permissions.forEach(perm=>{
            grantedPermissions.push(perm.permission)
        })
        query = "SELECT * FROM defaultpermissions WHERE roleName=?"
        permissions = this.#db.prepare(query).all(_roleName)
        permissions.forEach(perm=>{
            // check if permission is revoked
            query = "SELECT * FROM newpermissions WHERE userId=? AND permission=? AND revoked!=0"
            let revokedPerm = this.#db.prepare(query).get(_userId, perm.permission);
            // filter it out
            if (!revokedPerm) grantedPermissions.push(perm.permission);
        })
        return grantedPermissions;
    }
    /**
     * Returns permissions(Names) user can be given access to */
    userToBeGrantedPermissions(_userId, _roleName){
        let permissionsToGrant = []

        let query = "SELECT * FROM defaultpermissions WHERE permission!='BLOCK'"
        let permissions = this.#db.prepare(query).all()
        permissions.forEach(perm=>{
            // check if permission is revoked
            query = "SELECT * FROM newpermissions WHERE userId=? AND permission=? AND revoked!=0"
            let revokedPerm = this.#db.prepare(query).get(_userId, perm.permission);
            // filter it out
            if (revokedPerm){ 
                permissionsToGrant.push(perm.permission);
            }else{
                let matchesRole = perm.roleName == _roleName;
                if (!matchesRole) permissionsToGrant.push(perm.permission);
            }
        })
        return permissionsToGrant;
    }

    blockUser(_userId, _blockFlag){
        let query = "SELECT * FROM newpermissions WHERE userId=? AND permission='BLOCK'"
        let userToBlock = this.#db.prepare(query).get(_userId);
        if (userToBlock){
            query = "UPDATE newpermissions SET revoked=? WHERE userId=? AND permission='BLOCK'";
            userToBlock = this.#db.prepare(query).run(_blockFlag, _userId);
            if (userToBlock)
                return true;
            return false;
        }
        query = "INSERT INTO newpermissions (revoked, userId, permission) VALUES (?,?,?)";
        userToBlock = this.#db.prepare(query).run(_blockFlag, _userId, 'BLOCK');
        if (userToBlock)
            return true;
        return false;
    }

    changeUserPermission(_userId, _revokeFlag, _permissionName){
        let query = "SELECT * FROM newpermissions WHERE userId=? AND permission=?"
        let userPermission = this.#db.prepare(query).get(_userId, _permissionName);
        if (userPermission){
            query = "UPDATE newpermissions SET revoked=? WHERE userId=? AND permission=?";
            userPermission = this.#db.prepare(query).run(_revokeFlag, _userId, _permissionName);
            if (userPermission)
                return true;
            return false;
        }
        query = "INSERT INTO newpermissions (revoked, userId, permission) VALUES (?,?,?)";
        userPermission = this.#db.prepare(query).run(_revokeFlag, _userId, _permissionName);
        if (userPermission)
            return true;
        return false;
    }
}