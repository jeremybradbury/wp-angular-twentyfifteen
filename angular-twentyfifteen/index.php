<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * e.g., it puts together the home page when no home.php file exists.
 *
 * Learn more: {@link https://codex.wordpress.org/Template_Hierarchy}
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
  get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
      <nav class="navigation pagination" role="navigation">
        <h2 class="screen-reader-text">Posts navigation</h2>
        <div class="nav-links">
          <a class="prev page-numbers" ng-click="blur()" ng-class="{disabled: p == 1}" href="#{{prevPage()}}">Prev page</a>
          <a class="page-numbers" ng-click="blur()" ng-repeat="n in range(pages)" ng-class="{current: n == p}" href="#{{'page/'+n}}"><span class="meta-nav screen-reader-text">Page </span>{{n}}</a>
          <a class="next page-numbers" ng-click="blur()" ng-class="{disabled: p == pages}" href="#{{nextPage()}}">Next page</a>
        </div>
    	</nav>
      <div ng-repeat="post in data">
        <article id="post-{{post.id}}" class="{{addClasses(post).classes}}">
          <?php
            // Post thumbnail.  
						// TODO: replace
            twentyfifteen_post_thumbnail();
          ?>
          <header class="entry-header">
            <h2 class="entry-title"><a ng-click="blur()" href="#{{post.slug}}" rel="bookmark">{{post.title}}</a></h2>
          </header><!-- .entry-header -->  
          
          <div class="entry-content">
            <article ng-bind-html="trust(post.content)"></article>
          </div><!-- .entry-content -->
          <footer class="entry-footer">
            <span class="posted-on">
              <span class="screen-reader-text">Posted on </span>
              <a href="http://52.5.79.162/seitan-tumblr-try-hard-sriracha-letterpress-biodiesel/" rel="bookmark">		
                <time class="entry-date published" datetime="{{dateTime(post.date)}}">{{post.date}}</time>
                <time class="updated" datetime="{{dateTime(post.modified)}}">{{post.modified}}</time>
              </a>
            </span>
            <span class="cat-links">
              <span class="screen-reader-text">Categories </span>
              <a href="http://52.5.79.162/category/modern/" rel="category tag">Modern</a>
            </span>            
            <span class="edit-link">
              <a class="post-edit-link" href="http://52.5.79.162/wp-admin/post.php?post=131&amp;action=edit">Edit</a>
            </span>          
          </footer><!-- .entry-footer -->
        
        </article><!-- #post-## -->
			</div> 
		</main><!-- .site-main -->
	</div><!-- .content-area -->

<?php get_footer(); ?>