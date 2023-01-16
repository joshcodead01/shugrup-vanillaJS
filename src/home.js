const shopnowBtn = document.querySelector('.shopnow_btn')

shopnowBtn.addEventListener('click', () => {
    if (!localStorage.getItem('auth-token')) {
        window.location.href = 'login.html'
    } else {
        window.location.href = 'store.html'
    }
})