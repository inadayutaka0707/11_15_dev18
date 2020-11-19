var name;
var pass;
let accountKey = [];
let account = [];

//新規登録
function registration(){
    var password = document.getElementById('pass').value.length;
    const name = $("#name").val(); //入力値を取得
    const pass = $("#pass").val(); //入力値を取得

    console.log(name);
    console.log(pass);

    if(name == "" || password < 6){
        if(name == ""){
            alert('名前を入力してね');
            return false;
        }else if(password < 6){
            alert('パスワードは6文字以上入れてね');
            return false;
        }
    }else{
        localStorage.setItem(name,pass); //ローカルストレージに登録
        account.push({name, pass});
        console.log(account);
        $("#name").val(""); //入力欄を削除
        $("#pass").val(""); //入力欄を削除
        alert('登録完了');
        
    }
    
    return true;
}

//ログイン
function login(){
    var accountValue;
    name = $('#name').val();
    pass = $('#pass').val();
    var count = 0;
    console.log('あ');
    console.log(account);
    if(localStorage.length == 0){
        alert('新規登録をしてください');
        window.location.href = 'index2.html';
    }
    for(var i = 0; i < localStorage.length; i++){
        accountKey[i] = localStorage.key(i);
        console.log(accountKey[i]);
        accountValue = localStorage.getItem(accountKey[i]);
        console.log(accountValue);

        if(accountKey[i] == name){
            if(accountValue == pass){
                return true;
            }else if(pass == ""){
                if(accountKey[i] == name){
                    alert('パスワードを入力してください');
                    count += 1;
                }
            }else{
                if(accountKey[i] == name){
                    alert('パスワードが違います');
                    count += 1;
                    $("#pass").val("");
                }
            }
        }
        
        if(i == localStorage.length - 1 && count == 0){
            alert('登録情報がありません');
            $("#name").val("");
        }
    }
    return false;
}

//ユーザーページ
window.onload = function(){
    $("#header").html(`<h1>${name}</h1>`);

    $("#save").on("click", function(){
        const key = $("#key").val();
        const value = $("#memo").val();
        
        localStorage.setItem(key, value); //一覧表示に追加
        const html = `<li><span>${key}</span><span>${value}</span></li>`;

        $("#list").append(html);
        $("#key").val("");
        $("#memo").val("");

        
    });
    $("#clear").on('click', function () {
        // 保存されたデータ（localStorage）を消す
        localStorage.clear();
  
        // 削除するときに、入力されている中身を空にする
        $("#key").val("");
        $("#memo").val("");
        //id="list"を削除する
        $("#list").empty();
    });

    //3.ページ読み込み：保存データ取得表示
    for (let i = 0; i < localStorage.length; i++) {
        // 保存されたデータのkeyを取得
        const key = localStorage.key(i);
  
        // 何が入っているか確認してみよう☺️
        console.log();
  
        // getItemのKeyを使って保存されたデータを全部取得
        const value = localStorage.getItem(key);
  
        // 何が入っているか確認してみよう☺️
        const html = `
        <li>
          <span>${key}</span>
          <span>${value}</span>
        </li>`
  
        // htmlに埋め込む
        $("#list").append(html);
  
      }
}