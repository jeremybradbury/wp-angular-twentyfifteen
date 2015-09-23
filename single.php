<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

 get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
			<div ng-repeat="post in posts | filter:{ id: <?php the_ID(); ?> }">
				<?php 
            $classes = implode(" ",array_diff(get_post_class(), array("post-".get_the_ID())));
        ?>
        <article id="post-{{post.id}}" class="post-{{post.id}} <?php echo $classes ?>">
          <?php
            // Post thumbnail.
            //twentyfifteen_post_thumbnail();
          ?>
        
          <header class="entry-header">
          	<h1 class="entry-title">{{post.title}}</h1>
          </header><!-- .entry-header -->
        
          <div class="entry-content">
            <article>
              <div ng-bind-html="trust(post.content)"></div>
            </article>
          </div><!-- .entry-content -->
        
          <?php
            // Author bio.
            if ( get_the_author_meta( 'description' ) ) :
              get_template_part( 'author-bio' );
            endif;
          ?>
        
          <footer class="entry-footer">
            <?php // twentyfifteen_entry_meta(); ?>
            <?php edit_post_link( __( 'Edit', 'twentyfifteen' ), '<span class="edit-link">', '</span>' ); ?>
          </footer><!-- .entry-footer -->
        </article></div><!-- #post-## -->
		</main><!-- .site-main -->
	</div><!-- .content-area -->

<?php get_footer(); ?>
