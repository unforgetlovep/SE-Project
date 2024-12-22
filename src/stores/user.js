import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        username: '',
        userRole: '',
        userEmail: '',
        userPhone: '',
        userAddress: '',
        userBio: ''
    }),
    actions: {
        login(user) {
            this.isLoggedIn = true;
            this.username = user.username;
            this.userRole = user.role;
            this.userEmail = user.email;
            this.userPhone = user.phone;
            this.userAddress = user.address;
            this.userBio = user.bio;
        },
        logout() {
            this.isLoggedIn = false;
            this.username = '';
            this.userRole = '';
            this.userEmail = '';
        }
    }
});