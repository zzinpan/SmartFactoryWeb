const template = document.createElement('template');

export default {

    /**
     * @todo script 태그 동작이 안됨
     * @param html
     */
    toHtml( html: string ){

        template.innerHTML = html.trim();
        return template.content.firstChild;

    }

};