import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const { blockID, imgSrc, imgAlt, imgSrcset, imgSizes, headline, subHeadline, contentPosition, headlineTag } = attributes;

	return (
		<section { ...useBlockProps.save({
			id: blockID,
			className: `hp-showcase-block`
		}) }>
			<div class="container">
				<div class="hp-custom-showcase-block__info">
					<RichText.Content
						tagName={ headlineTag }
						value={ headline }
					/>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dicta simi</p>
					<a href="#">Learn More</a>
				</div>
				{/* <img src="showcase-sample.jpg" alt="" srcset="" sizes="" loading="lazy"> */}
			</div>
		</section>
	);
}
