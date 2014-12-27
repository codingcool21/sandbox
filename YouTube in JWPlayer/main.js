var $scope = {};
$scope.find_out_param_url = function (key_param, callback) {
    var search_param = location.search;
    if (search_param.indexOf(key_param) == -1) {
        if (callback == undefined) {
            return false;
        } else {
            callback(false);
        }
    }
    search_param = search_param.split(key_param + "=");
    yoyo = search_param[0];
    var search_param_tmp = search_param[1];
    if (search_param_tmp == undefined) {
        if (callback == undefined) {
            return false;
        } else {
            callback(false);
        }
    } else {
        var search_param_tmp_boyo = search_param_tmp.split("&");
        //search_param_tmp = search_param_tmp_boyo[1];
        if (callback == undefined) {
            return decodeURI(search_param_tmp_boyo[0]);
        } else {
            callback(decodeURI(search_param_tmp_boyo[0]));
        }
    }
}
$(function () {
    $scope.find_out_param_url("video_id", function (result) {
            $scope.videoID = result;
            if($scope.videoID == false) {
                //window.close();
            } else {
                jwplayer("video-container").setup({
                    file: 'http://www.youtube.com/watch?v='+$scope.videoID,
                    width: $(window).innerWidth()-50,
                    height: $(window).innerHeight()-50,
                    autostart: true
                })
            }
    });
});