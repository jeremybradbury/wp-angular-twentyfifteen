<?php
/**
 * The default template for displaying content
 *
 * Used for both single and index/archive/search.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
?>
<?php 
    $classes = implode(" ",array_diff(get_post_class(), array("post-".get_the_ID())));
?>
<article id="post-{{post.id}}" class="post-{{post.id}} <?php echo $classes ?>">
	<?php
		// Post thumbnail.
		twentyfifteen_post_thumbnail();
	?>

	<header class="entry-header">
		<?php if ( is_single() ) : ?>
				<h1 class="entry-title">{{post.title.rendered}}</h1>
		<?php	else : ?>
				<h2 class="entry-title"><a href="{{post.link}}" rel="bookmark">{{post.title.rendered}}</a></h2>
		<?php endif; ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
    <article>
      <div ng-bind-html="trust(post.excerpt.rendered)"></div>
    </article>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php twentyfifteen_entry_meta(); ?>
		<?php edit_post_link( __( 'Edit', 'twentyfifteen' ), '<span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-footer -->

</article><!-- #post-## -->
