$(function(){
    const API = "https://api.github.com/users/"
    let inputSerch = $("form:first input")
    let repos = $(".repos")
    let numberStatus = $(".n-status")

    function getJsonInfo(userName) {
        $.ajax({
            url: API + userName,
            datatype: "json",
            type:"get",
            success: function(data) {
                creatCrad(data)
                setRepos(data.repos_url)
                refreshAnimation()
            },
            error: function(error) {
                showError(error.status)
            }
        })
    }

    $("form:first").submit(function(event) {
        event.preventDefault()
        if (inputSerch.val().length > 0) {
            getJsonInfo(inputSerch.val())
            inputSerch.val("")
        }
    })

    function refreshAnimation() {
        $(".repos div").removeClass("animated-bg")
        $(".n-status p span").removeClass("animated-bg")
        $(".n-status p span").removeClass("animated-bg")
        $(".info .name").removeClass("animated-bg animated-bg-text")
        // hide error when search
        $(".error img").removeClass("show-error")
        // refresh all repos
        $(`.repos div a`).html("")
    }

    function creatCrad(data) {
        $(".info img.av").attr("src" , data.avatar_url).css("border-radius" , "50%")
        $(".info .name").html(data.name || data.login)
        $(".n-status .foll-er").html(data.followers)
        $(".n-status .foll-ing").html(data.following)
        $(".n-status .repo").html(data.public_repos)
    }

    function setRepos(reposUrl) {
        $.getJSON(reposUrl ,function(data) {
            if (data.length != 0){
                for (let i=0 ; i <= 4 ; i++) {
                    $(`.repos div:nth-child(${i}) a`).html(data[i].name)
                    $(`.repos div:nth-child(${i}) a`).attr("href" , data[i].html_url)
                }
            }
        })
    }

    function showError(errorStatus) {
        if (errorStatus === 404) {
            $(".error .error4").removeClass("hide-error")
            $(".error .error4").addClass("show-error")
        }else {
            $(".error .error3").removeClass("hide-error")
            $(".error .error3").addClass("show-error")
        }
    }
















})