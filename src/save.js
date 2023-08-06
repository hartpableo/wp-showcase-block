import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const { 
		blockID, 
		imgID, imgSrc, imgAlt, imgWidth, imgHeight, imgSrcset, imgSizes, imgOverlay,
		iconID, iconSrc, iconAlt, iconWidth, iconHeight, 
		headline, subHeadline, headlineTag, textColor,
		linkText, linkURL, linkOpenNewTab,
		contentPositionX, contentPositionY,
		spacingTop, spacingBottom
	} = attributes;

	const linkTarget = linkOpenNewTab ? '_blank' : '_self';
	const rel = linkOpenNewTab ? 'noopener noreferrer' : 'noopener';

	return (
		<section { ...useBlockProps.save({
			id: blockID,
			className: `hp-showcase-block ${spacingTop} ${spacingBottom} ${contentPositionY}`
		}) }>
			<div class={ `container ${contentPositionX}` }>
				<div className={ `hp-custom-showcase-block__info ${contentPositionX}` }>
					{
						iconSrc && (
							<img src={ iconSrc } alt={ iconAlt } width={ iconWidth } height={ iconHeight } loading="lazy" aria-hidden="true"/>
						)
					}
					<RichText.Content
						tagName={ headlineTag }
						value={ headline }
						style={{
							color: textColor
						}}
					/>
					<RichText.Content
						tagName="p"
						value={ subHeadline }
						style={{
							color: textColor
						}}
					/>
					{ linkURL && linkText && (
						<a href={ linkURL } className="hp-custom-link" target={ linkTarget } rel={ rel }>{ linkText }</a>
					) }
				</div>
			</div>
			<img className="hp-showcase-block__bg-img" src={ imgSrc } alt={ imgAlt } srcset={ imgSrcset } sizes={ imgSizes } width={ imgWidth } height={ imgHeight } loading="lazy" />
			<div className="bg-img-overlay" aria-hidden="true" style={{ backgroundColor: imgOverlay }}></div>
		</section>
	);
}
