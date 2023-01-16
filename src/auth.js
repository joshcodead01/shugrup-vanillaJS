const token = localStorage.getItem('auth-token')

if (!token) {
    window.location.href = 'home.html'
} else {
    console.log('youre logged in')
}