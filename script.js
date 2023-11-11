const menubarButton = document.getElementById('toggle-menubar');

menubarButton.addEventListener('click', () => {
    menubarButton.classList.toggle('showing');
});