import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        username: '',
        userRole: '',
        userEmail: ''
    }),
    actions: {
        login(user) {
            this.isLoggedIn = true;
            this.username = user.username;
            this.userRole = user.role;
            this.userEmail = user.email;
        },
        logout() {
            this.isLoggedIn = false;
            this.username = '';
            this.userRole = '';
            this.userEmail = '';
        }
    }
});