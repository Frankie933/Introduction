//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//https://medium.com/@nerdplusdog/a-how-to-guide-for-modal-boxes-with-javascript-html-and-css-6a49d063987e
//https://www.w3schools.com/howto/howto_css_modals.asp

//Now I package the ModalWindow in a class, that can open and close the modal window
class modalWindow {

    //class contructor
    constructor(modalWindow, pageContent, pageContentInModal, closeBtn) {

        this.modalWindow = modalWindow;     //Modal window containing header and form
        this.pageContent = pageContent;     //That page content that will be blocked during modal
        this.pageContentInModal = pageContentInModal; //The gray cover over the background
        this.closeBtn = closeBtn;           //The close button in the modal

        //The events for closing
        this.closeBtn.addEventListener('click', () => { this.Close()});

        //The event for closing when clicking outside modalWindow
        window.addEventListener('click', (e) => {
            if (e.target == pageContentInModal) {
                this.Close();
            }
        })
    }

    //This is the eventhandler that opens the modal window
    Open()
    {
        this.modalWindow.style.display = "block";
        this.pageContentInModal.style.display = "block";
    }
    Close()
    {
        this.modalWindow.style.display = "none";
        this.pageContentInModal.style.display = "none";
    }
}

export default modalWindow;