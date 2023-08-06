import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button, ColorPicker } from '@wordpress/components';
import { image, title, handle, formatOutdentRTL } from '@wordpress/icons';
import { Link } from '@10up/block-components';

import './editor.scss';

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { 
		blockID, 
		imgID, imgSrc, imgAlt, imgWidth, imgHeight, imgSrcset, imgSizes, imgOverlay,
		iconID, iconSrc, iconAlt, iconWidth, iconHeight, 
		headline, subHeadline, headlineTag, textColor, subtextColor,
		linkText, linkURL, linkOpenNewTab,
		contentPositionX, contentPositionY,
		spacingTop, spacingBottom
	} = attributes;

	setAttributes({ blockID: !blockID ? clientId : blockID });

	const onSelectImage = img => {
		let srcSet = `${img.sizes.full.url} ${img.sizes.full.width}w, ${img.sizes.showcase_block_bg_tablet.url} ${img.sizes.showcase_block_bg_tablet.width}w, ${img.sizes.showcase_block_bg_mobile.url} ${img.sizes.showcase_block_bg_mobile.width}w,`;
		setAttributes({
			imgID: img.id,
			imgSrc: img.url,
			imgAlt: img.alt || 'Background Image',
			imgWidth: img.width,
			imgHeight: img.height,
			imgSrcset: srcSet,
			imgSizes: "100vw"
		})
	}

	const onSelectIcon = icon => {
		setAttributes({
			iconID: icon.id,
			iconSrc: icon.sizes.showcase_block_icon.url,
			iconAlt: icon.alt || 'Icon',
			iconWidth: icon.sizes.showcase_block_icon.width,
			iconHeight: icon.sizes.showcase_block_icon.height
		})
	}

	const onRemoveImage = () => {
		setAttributes({
			imgID: null,
			imgSrc: "https://placehold.co/2000x1500",
			imgAlt: null,
			imgSrcset: null,
			imgSizes: null,
			imgWidth: null,
			imgHeight: null
		})
	}

	const onRemoveIcon = () => {
		setAttributes({
			iconID: null,
			iconSrc: null,
			iconAlt: null,
		})
	}

	const handleTextChange = value => setAttributes({linkText: value});
	const handleLinkChange = value => setAttributes({
			linkURL: value?.url,
			linkOpenNewTab: value?.opensInNewTab,
			linkText: value?.title ?? linkText
	});
	const handleLinkRemove = () => setAttributes({
			linkURL: null,
			linkOpenNewTab: null
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title="Background Image" icon={ image } initialOpen={ false }>
					<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes={ [ 'image' ] }
							value={ imgID }
							render={({ open }) => (
								<>
									<Button
										className={ `hp-custom-btn ${!imgID ? 'editing' : 'preview'}` }
										onClick={ open }
									>
										<img src={ imgSrc } alt={ imgAlt } srcset={ imgSrcset } sizes={ imgSizes } width={ imgWidth } height={ imgHeight } loading="lazy" />
										<div className='hp-btn--img-edit'>
											{ !imgID && 'Set Image' }
											{ !!imgID && imgSrc && 'Change Image' }
										</div>
									</Button>
									{
										!!imgID && imgSrc && (
											<Button
												className="hp-custom-btn hp-custom-delete-btn" 
												isLink 
												isDestructive
												onClick={ onRemoveImage }
											>
												Delete Image
											</Button>
										)
									}
								</>
							)}
						/>
						<hr/>
						<p><strong>Image Overlay</strong></p>
						<ColorPicker
							color={ imgOverlay }
							onChange={ val => setAttributes({ imgOverlay: val }) }
							enableAlpha
							defaultValue="#000"
						/>
				</PanelBody>
				<PanelBody title="Manage Text" icon={ title } initialOpen={ false }>
					<SelectControl
						label="Tag to use"
						value={ headlineTag }
						options={[
							{ label: __( 'Heading 1', 'hart-showcase-block' ), value: 'h1' },
							{ label: __( 'Heading 2', 'hart-showcase-block' ), value: 'h2' },
							{ label: __( 'Heading 3', 'hart-showcase-block' ), value: 'h3' },
							{ label: __( 'Heading 4', 'hart-showcase-block' ), value: 'h4' },
							{ label: __( 'Heading 5', 'hart-showcase-block' ), value: 'h5' },
							{ label: __( 'Heading 6', 'hart-showcase-block' ), value: 'h6' },
							{ label: __( 'Paragraph', 'hart-showcase-block' ), value: 'p' },
						]}
						onChange={ val => {
							setAttributes({ headlineTag: val })
						} }
						__nextHasNoMarginBottom
					/>
					<p>Headline Icon</p>
					<MediaUpload
						onSelect={ onSelectIcon }
						allowedTypes={ [ 'image' ] }
						value={ iconID }
						render={({ open }) => (
							<>
								<Button
									className={ `hp-custom-btn ${!iconID ? 'editing' : 'preview'}` }
									onClick={ open }
								>
									{ !!iconID && <img src={ iconSrc } alt={ iconAlt } loading="lazy" aria-hidden="true"/> }
									<div className="hp-btn--img-edit">
										{ !iconID && 'Set Icon' }
										{ !!iconID && iconSrc && 'Change Icon' }
									</div>
								</Button>
								{
									!!iconID && iconSrc && (
										<Button
											className="hp-custom-btn hp-custom-delete-btn" 
											isLink 
											isDestructive 
											onClick={ onRemoveIcon }
										>
											Delete Icon
										</Button>
									)
								}
							</>
						)}
					/>
					<hr/>
					<p>Text Color</p>
					<ColorPicker
						color={ textColor }
						onChange={ val => setAttributes({ textColor: val }) }
						enableAlpha
						defaultValue="#fff"
					/>
				</PanelBody>
				<PanelBody title="Block Spacing" icon={ handle } initialOpen={ false }>
					<SelectControl
						label="Top Spacing"
						value={ spacingTop }
						options={[
							{ label: __( 'None', 'hart-showcase-block' ), value: 'spacing-top--none' },
							{ label: __( 'Small', 'hart-showcase-block' ), value: 'spacing-top--sm' },
							{ label: __( 'Medium', 'hart-showcase-block' ), value: 'spacing-top--md' },
							{ label: __( 'Large', 'hart-showcase-block' ), value: 'spacing-top--lg' },
							{ label: __( 'Extra-Large', 'hart-showcase-block' ), value: 'spacing-top--xl' },
						]}
						onChange={ val => {
							setAttributes({ spacingTop: val })
						} }
					/>
					<SelectControl
						label="Bottom Spacing"
						value={ spacingBottom }
						options={[
							{ label: __( 'None', 'hart-showcase-block' ), value: 'spacing-bottom--none' },
							{ label: __( 'Small', 'hart-showcase-block' ), value: 'spacing-bottom--sm' },
							{ label: __( 'Medium', 'hart-showcase-block' ), value: 'spacing-bottom--md' },
							{ label: __( 'Large', 'hart-showcase-block' ), value: 'spacing-bottom--lg' },
							{ label: __( 'Extra-Large', 'hart-showcase-block' ), value: 'spacing-bottom--xl' },
						]}
						onChange={ val => {
							setAttributes({ spacingBottom: val })
						} }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody title="Content Position" icon={ formatOutdentRTL } initialOpen={ false }>
					<SelectControl
						label="Horizontal Position"
						value={ contentPositionX }
						options={[
							{ label: __( 'Left', 'hart-showcase-block' ), value: 'x-left' },
							{ label: __( 'Center', 'hart-showcase-block' ), value: 'x-center' },
							{ label: __( 'Right', 'hart-showcase-block' ), value: 'x-right' },
						]}
						onChange={ val => {
							setAttributes({ contentPositionX: val })
						} }
						__nextHasNoMarginBottom
					/>
					<SelectControl
						label="Vertical Position"
						value={ contentPositionY }
						options={[
							{ label: __( 'Top', 'hart-showcase-block' ), value: 'y-top' },
							{ label: __( 'Center', 'hart-showcase-block' ), value: 'y-center' },
							{ label: __( 'Bottom', 'hart-showcase-block' ), value: 'y-bottom' },
						]}
						onChange={ val => {
							setAttributes({ contentPositionY: val })
						} }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>

			<section { ...useBlockProps({
				id: blockID,
				className: `hp-showcase-block ${spacingTop} ${spacingBottom} ${contentPositionY}`
			}) }>
				<div class={ `container ${contentPositionX}` }>
					<div className={ `hp-custom-showcase-block__info ${contentPositionX}` }>
						<div className="hp-custom-showcase-block__info-header">
							{
								iconSrc && (
									<img src={ iconSrc } alt={ iconAlt } width={ iconWidth } height={ iconHeight } loading="lazy" aria-hidden="true"/>
								)
							}
							<RichText
								tagName={ headlineTag }
								value={ headline }
								style={{
									color: textColor
								}}
								onChange={ val => setAttributes({ headline: val }) }
							/>
						</div>
						<RichText
							tagName="p"
							value={ subHeadline }
							style={{
								color: textColor
							}}
							onChange={ val => setAttributes({ subHeadline: val }) }
						/>
						<Link 
							value={ linkText }
							url={ linkURL }
							opensInNewTab={ linkOpenNewTab }
							onTextChange={ handleTextChange }
							onLinkChange={ handleLinkChange }
							onLinkRemove={ handleLinkRemove }
							className='hp-custom-link'
							placeholder='Enter Link Text here...'
            />
					</div>
				</div>
				<img className="hp-showcase-block__bg-img" src={ imgSrc } alt={ imgAlt } srcset={ imgSrcset } sizes={ imgSizes } width={ imgWidth } height={ imgHeight } loading="lazy" />
				<div className="bg-img-overlay" aria-hidden="true" style={{ backgroundColor: imgOverlay }}></div>
			</section>
		</>
	);
}
