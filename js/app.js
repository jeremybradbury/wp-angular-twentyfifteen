var angles = angular.module( 'angles', [] );

// Set the configuration
angles.run( ['$rootScope', function($rootScope) {

	// Variables defined by wp_localize_script
	$rootScope.apiuri = anglesJS.api;
  
  // blur anchors
	jQuery("a[rel='home']").focus(function(){this.blur()});
  $rootScope.blur = function () { jQuery("a[rel='home']").focus(); return false; };

}]);

// Add a controller
angles.controller( 'wordpress', ['$scope', '$sce', '$http', function( $scope, $sce, $http ) { 
/** content **/
// trust(html) TODO: add hash filter here
  $scope.trust = function (html) { return $sce.trustAsHtml(html); };
  $scope.dateTime = function (dt) { return dt.replace(' ','T') + '+00:00' }
// getPosts(id ~optional)
  $scope.getPosts = function ( id ) {
    var param = { }, page;
    if (typeof id !== 'undefined' && id.trim() != '' ){
      switch (true) {
      	case (id.search('page')==0):
          // wee we're paging
          $scope.p = parseInt(id.split('/')[1]);
          // console.log($scope.p);
          param = { 'page' : $scope.p }
          break;
        case (id.search('category')==0):
          $scope.p = id.split('/')[1];
          param = { 'category' : $scope.p }
          break;
        case (id.search('tag')==0):
          $scope.p = id.split('/')[1];
          param = { 'tag' : $scope.p }
          break;
        default:
          // single post request
        	return $scope.getPost( id );
      }
    } else {
      $scope.p = 1;
    }
    $http({
      method: 'GET',
      url: $scope.apiuri + 'get_posts',
      params: param,
    }).
    success( function( data, status, headers, config ) {      
      for (var u in data.posts) { 
				data.posts[u].url = $scope.getNav(data.posts[u].url);
      }
      $scope.data = data.posts; // return 'posts' array
      $scope.posts = parseInt(data.count_total);
      $scope.pages = data.pages;
      if ('undefined' !== typeof $scope.prev) { $scope.prev = undefined; }
    	if ('undefined' !== typeof $scope.next) { $scope.next = undefined; }
      console.log( $scope );
    }).
    error(function(data, status, headers, config) {
      window.top.location.href = '/not-found-error'; // bail to 404
    });
  };
// getPost(id)
  $scope.getPost = function ( id ) {
    if ('undefined' === typeof id) { return console.log('id required', id); }
    var param = { 'id' : id }; // single post if id is passed
    if(isNaN(id)){ param = { 'slug' : id }; } // slug provided
    $http({
      method: 'GET',
      url: $scope.apiuri + 'get_post',
      params: param,
    }).
    success( function( data, status, headers, config ) {
      //console.log( id );
      data.post.url = $scope.getNav(data.post.url); 
      $scope.pages = 0;
      $scope.p = -1;
      if('undefined' !== typeof data.next_url) { 
        $scope.prev = data.next_url.split('/')[3]; 
        data.next_url = $scope.getNav(data.next_url);
      } else { $scope.p = 1; }
      if('undefined' !== typeof data.previous_url) { 
        $scope.next = data.previous_url.split('/')[3]; 
      	data.previous_url = $scope.getNav(data.previous_url);
      } else { $scope.p = 0; }
      $scope.data = [data.post]; // return 'post' array wrapped
      //console.log( data, $scope );
    }).
    error(function(data, status, headers, config) {
      window.top.location.href = '/not-found-error'; // bail to 404
    });
  };
// getSidebar(id)
  $scope.getSidebar = function ( id ) {
    var param = { 'sidebar_id' : 'sidebar-1' };
    var theurl = $scope.apiuri + 'widgets/get_sidebar';
    if ('undefined' !== typeof id) { param = { 'sidebar_id' : id }; } 
    $http({
      method: 'GET',
      url: theurl,
      params: param,
    }).
    success( function( data, status, headers, config ) {
      for (var u in data.widgets) { 
				data.widgets[u].widget = $scope.getNav(data.widgets[u].widget);
      }
      $scope.widgets = data.widgets; // return 'widgets'
    }).
    error(function(data, status, headers, config) {
      console.log(data, status, headers, config);
    });
  };
// addClasses(post)
  // attaches classes that the theme is expecting to the post when requested
  // usage: <article class="{{addClasses(post).classes}}">
  $scope.addClasses = function(post) {
    var cat = '', tag = '';
    for (var c in post.categories) { cat += ' category-' + post.categories[c].slug; }
    for (var t in post.tags) { tag += ' tag-' + post.tags[t].slug; }
    post.classes = 'post-' + post.id
                 + ' '+post.type
                 + ' type-' + post.type
                 + ' status-' + post.status
                 + ' format-standard'
                 + ' hentry'
                 + cat
                 + tag;
    return post;
  }
// getNav(url)
  // replaces "protocol:host/path/to/page" with "protocol:host/#path/to/page"
  $scope.getNav = function(url){
  	url = url.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function($0) {  
        return $0.replace(window.top.location.host + '/', window.top.location.host + '/#');
    });
    return url;
  }
/** /content **/
  
/** route **/
  $scope.range = function (start, end) {
    var ret = [];
    if (!end) { end = start +1; start = 1; }
    for (var i = start; i < end; i++) { ret.push(i); }
    return ret; // indexed array of range length
  };
  $scope.nextPage = function(){
  	if ('undefined' !== typeof $scope.next) {
      return $scope.next;
    } else {
    	if ('undefined' !== typeof $scope.p) { return 'page/' + ($scope.p + 1); }
    }
  }  
  $scope.prevPage = function(){
  	if ('undefined' !== typeof $scope.prev) {
      return $scope.prev;
    } else {
      if ('undefined' !== typeof $scope.p) { return 'page/' + ($scope.p - 1); } 
    }
  }
// #anchor based navigation
  jQuery(window).bind('hashchange', function () {
    var nav = window.top.location.hash.replace('#','');
    // console.log('navigating to: /', nav);
    $scope.getPosts(nav);
	});
/** /route **/

// initial content load
  $scope.getPosts(window.top.location.hash.replace('#',''));
  $scope.getSidebar();

}]);
