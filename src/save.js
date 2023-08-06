import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const { 
		blockID, 
		imgID, imgSrc, imgAlt, imgWidth, imgHeight, imgSrcset, imgSizes, 
		iconID, iconSrc, iconAlt, iconWidth, iconHeight, 
		headline, subHeadline, headlineTag,
		contentPosition,
		spacingTop, spacingBottom
	} = attributes;

	return (
		<section { ...useBlockProps.save({
			id: blockID,
			className: `hp-showcase-block ${spacingTop} ${spacingBottom}`
		}) }>
			<div class="container">
				<div class="hp-custom-showcase-block__info">
					{
						iconSrc && (
							<img src={ iconSrc } alt={ iconAlt } width={ iconWidth } height={ iconHeight } loading="lazy" aria-hidden="true"/>
						)
					}
					<RichText.Content
						tagName={ headlineTag }
						value={ headline }
					/>
					<RichText.Content
						tagName="p"
						value={ subHeadline }
					/>
					<a href="#">Learn More</a>
				</div>
				<img src={ imgSrc } alt={ imgAlt } srcset={ imgSrcset } sizes={ imgSizes } width={ imgWidth } height={ imgHeight } loading="lazy" />
			</div>
		</section>
	);
}
