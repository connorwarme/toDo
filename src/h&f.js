// header and footer
import { createElement } from './utility';
const Header = new URL('/home/peregrinning/Documents/Coding/TOP/toDo/src/headercheck.png', import.meta.url);
const Github = new URL('/home/peregrinning/Documents/Coding/TOP/toDo/src/github.png',  import.meta.url);
const LinkedIn = new URL('/home/peregrinning/Documents/Coding/TOP/toDo/src/linkedin.png', import.meta.url);

const makeHF = () => {
    const header = () => {
        let header = document.querySelector('div.header');
        let headerImgBox = createElement('div', {"class": "headerImgBox"});
        const icon = new Image();
        icon.src = Header;
        let headerTextBox = createElement('div', {"class": "headerTextBox"});
        headerTextBox.textContent = "MATE";

        // append it all together
        header.appendChild(headerImgBox);
        headerImgBox.appendChild(icon);
        header.appendChild(headerTextBox);
    }
    const footer = () => {
        let footer = document.querySelector('div.footer');
        let footerBox = createElement('div', {"class": "footerBox"});
        let linkContainer = createElement('div', {"class": "linkContainer"});
        let gitLink = createElement('a', {"href": "https://github.com/connorwarme", "alt": "Github Profile"});
        let gitIcon = new Image();
        gitIcon.src = Github;
        gitIcon.alt = "Github Profile";
        let linkLink = createElement('a', {"href": "https://www.linkedin.com/in/connor-warme-103a09167", "alt": "LinkedIn Profile"});
        let linkIcon = new Image();
        linkIcon.src = LinkedIn;
        linkIcon.alt = "LinkedIn Profile";
        let textContainer = createElement('div', {"class": "textContainer"});

        // append it all together
        footer.appendChild(footerBox);
        footerBox.appendChild(linkContainer);
        linkContainer.appendChild(gitLink);
        gitLink.appendChild(gitIcon);
        linkContainer.appendChild(linkLink);
        linkLink.appendChild(linkIcon);
        footerBox.appendChild(textContainer);
    }
    header();
    footer();
}
export { makeHF };