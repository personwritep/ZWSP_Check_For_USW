// ==UserScript==
// @name        ZWSP Check for USW
// @namespace        http://tampermonkey.net/
// @version        0.1
// @description        UserStyles.world の登録コードのゼロ幅スペースを告知する
// @author        Userstyles.world User
// @match        https://userstyles.world/edit/*
// @match        https://userstyles.world/style/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=userstyles.world
// @grant        none
// @updateURL        https://github.com/personwritep/ZWSP_Check_for_USW/raw/main/ZWSP_Check_for_USW.user.js
// @downloadURL        https://github.com/personwritep/ZWSP_Check_for_USW/raw/main/ZWSP_Check_for_USW.user.js
// ==/UserScript==


setTimeout(()=>{

    let preview=document.querySelector('#preview h1');
    let source_code=document.querySelector('#content .Style-source code');
    if(preview && source_code){
        let source_text=source_code.textContent;
        if(source_text.startsWith('\u200B')){
            preview.style.background='red'; }
        else{
            preview.style.background=''; }}

}, 400);




setTimeout(()=>{

    let label=document.querySelector('label[for="code"]');
    let editor=document.querySelector('#code');
    if(label && editor){
        let source=editor.value;
        if(source.startsWith('\u200B')){
            label.style.background='red';
            delete_zwsp(editor); }
        else{
            label.style.background=''; }


        function delete_zwsp(editor){
            let sw=
                '<button class="exsw">Delete ZWSP</button>'+
                '<style>.exsw { margin-left: 30px; min-height: 0; height: 24px; line-height: 14px; '+
                'padding: 0 6px; border-radius: 4px; color: #fff; background: #000; }</style>';

            let label=document.querySelector('label[for="code"]');
            if(label){
                if(!label.querySelector('.exsw')){
                    label.insertAdjacentHTML('beforeend', sw); }

                let exsw=label.querySelector('.exsw');
                if(exsw){
                    exsw.onclick=function(event){
                        event.preventDefault();
                        let source=editor.value;
                        editor.value=source.replace('\u200B', '');

                        setTimeout(()=>{
                            if(editor.value.startsWith('\u200B')){
                                label.style.background='red'; }
                            else{
                                label.style.background='';
                                let exsw_=label.querySelector('.exsw');
                                if(exsw_){
                                    exsw_.remove(); }}
                        }, 400);

                    }}}

        } // delete_zwsp()

    } // if(label && editor)

}, 1000);
