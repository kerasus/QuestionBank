$('.m--monta-app .m--main-panel .m--control-container').prepend('<div class="columns is-mobile is-size-7-mobile"> <div class="column is-narrow has-centered-children" style="width: 78.48px;"> کد: </div> <div class="column"> <input class="input is-success" placeholder="کد را وارد کنید" type="text" id="getQuestionsInput"> <p class="help is-danger"></p> </div> </div><div class="columns is-mobile is-size-7-mobile"> <div class="column is-narrow has-centered-children" style="width: 100%;"> <a class="button is-success" style="width: 100%;" tabindex="0" id="getMontaQuestions"> ثبت </a> </div> </div>')
$('#getMontaQuestions').click(function(){
    var url = 'https://www.monta.ir/gwtRequest'
    var inputJson = $('#getQuestionsInput').val()
    inputJson = inputJson.replaceAll('"length":30', '"length":9999999999')
    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Content-Type': 'application/json; charset=utf-8',
            'X-GWT-Permutation': 'BD99F2C98F5FE5393A0BDAF078439F5E',
            'debugUserId': '858006',
            'uuidv4': '56b5d7ba-d1b3-46f1-bb1b-69a015510d05',
            'userId': '858006',
            'tabId': '1619247922206',
            'fingerprint': '0eea2ff8dfe4593058c7cf5945e01f93'
        },
        data: inputJson
    })
    .done(function(result) {
        console.log('result', result)
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(result)));
        pom.setAttribute('download', 'montaQuestions.json');

        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }

        // let resultContent = "data:application/json," + encodeURIComponent(JSON.stringify(result));
        // window.open(resultContent, 'resultContent');
    });
});
