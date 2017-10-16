export interface IUser {
    email: string;
    password: string;
}

interface IConfirmedUser extends IUser {
    isActive: true;
}

export interface IAdmin extends IConfirmedUser {
    adminSince: Date;
}

export class AccountManager {
    users: IUser[] = new Array();

    /**
     * Create a new user account
     * @param email email address
     * @param password the user's password
     * @return the new user account. An admin must activate it using activateNewUser
     * @see this.activateNewUser
     */
    register(email: string, password: string): IUser {
        if (!email) throw 'Must provide an email';
        if (!password) throw 'Must provide a password';
        let user : IUser = {email, password};
        this.users.push(user);
        return user;
    }

    /**
     * Activate a new user account
     * @param approver The admin who's approving this new user
     * @param userToApprove Newly-registered user, who is to be activated
     * @return the updated user oblect, now activated
     */
    activateNewUser(approver: IAdmin, userToApprove: IUser): IConfirmedUser {
        if (!approver.adminSince) throw 'Approver is not an admin!';
        let toConfirm = userToApprove as IConfirmedUser;
        toConfirm.isActive = true;

        // or, alternatively (not the bes though):
        // let toConfirm = (userToApprove as IConfirmedUser).isActive = true;
        return toConfirm;
    }

    promoteToAdmin(exisitngAdmin: IAdmin, user: IConfirmedUser): IAdmin {
        if (!exisitngAdmin.adminSince) throw 'Not an admin!';
        if (user.isActive !== true) throw 'User must be active in order to be promoted to Admin!';

        let newAdmin = user as IAdmin;
        newAdmin.adminSince = new Date();

        // or alternatively:
        // return {...user, adminSince = new Date()} as IAdmin;
        // return {...user, adminSince = new Date()};
        return newAdmin;
    }
}

let u: IUser = {email: 'a', password: 'b'};
let a: IAdmin = {email: 'a', password: 'b', isActive: true, adminSince: new Date()};
let am = new AccountManager();
let cu = am.activateNewUser(a, u);
am.promoteToAdmin(a, cu);