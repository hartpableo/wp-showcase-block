import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl, Button, ToggleControl, TextControl } from '@wordpress/components';
import { image } from '@wordpress/icons';
import { Link } from '@10up/block-components';

import './editor.scss';

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { 
		blockID, 
		imgID, imgSrc, imgAlt, imgWidth, imgHeight, imgSrcset, imgSizes, 
		iconID, iconSrc, iconAlt, iconWidth, iconHeight, 
		headline, subHeadline, headlineTag,
		linkText, linkURL, linkOpenNewTab,
		contentPosition,
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
			imgSrc: "https://placehold.co/2000x900",
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
				<PanelBody title="Background Image" icon={ image } initialOpen={ true }>
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
				</PanelBody>
				<PanelBody title="Headline Tag" initialOpen={ true }>
					<SelectControl
						label="Tag"
						value={ headlineTag }
						options={[
							{ label: __( 'H1', 'hart-showcase-block' ), value: 'h1' },
							{ label: __( 'H2', 'hart-showcase-block' ), value: 'h2' },
							{ label: __( 'H3', 'hart-showcase-block' ), value: 'h3' },
							{ label: __( 'H4', 'hart-showcase-block' ), value: 'h4' },
							{ label: __( 'H5', 'hart-showcase-block' ), value: 'h5' },
							{ label: __( 'H6', 'hart-showcase-block' ), value: 'h6' },
							{ label: __( 'P', 'hart-showcase-block' ), value: 'p' },
						]}
						onChange={ val => {
							setAttributes({ headlineTag: val })
						} }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody title="Headline Icon" initialOpen={ false }>
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
				</PanelBody>
				<PanelBody title="Block Spacing" initialOpen={ false }>
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
				{/* <PanelBody title="Manage Button" initialOpen={ false }>
					<TextControl
						label="Link Text"
						value={ linkText }
						onChange={ val => setAttributes({ linkText: val }) }
					/>
					<ToggleControl
						label={ __('Open link in new tab?', 'hart-showcase-block') }
						help={ linkOpenNewTab ? 'Yes' : 'No' }
						checked={ linkOpenNewTab }
						onChange={ val => {
							setAttributes({ linkOpenNewTab: val });
						}}
					/>
				</PanelBody> */}
			</InspectorControls>

			<section { ...useBlockProps({
				id: blockID,
				className: `hp-showcase-block ${spacingTop} ${spacingBottom}`
			}) }>
				<div className="container">
					<div className="hp-custom-showcase-block__info">
						<div className="hp-custom-showcase-block__info-header">
							{
								iconSrc && (
									<img src={ iconSrc } alt={ iconAlt } width={ iconWidth } height={ iconHeight } loading="lazy" aria-hidden="true"/>
								)
							}
							<RichText
								tagName={ headlineTag }
								value={ headline }
								onChange={ val => setAttributes({ headline: val }) }
							/>
						</div>
						<RichText
							tagName="p"
							value={ subHeadline }
							onChange={ val => setAttributes({ subHeadline: val }) }
						/>
						{/* { linkText && (
							<a href={ linkURL } className="hp-custom-link" target={ linkOpenNewTab ? '_blank' : '_self' }>{ linkText }</a>
						) } */}
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
					<img className="hp-showcase-block__bg-img" src={ imgSrc } alt={ imgAlt } srcset={ imgSrcset } sizes={ imgSizes } width={ imgWidth } height={ imgHeight } loading="lazy" />
				</div>
			</section>
		</>
	);
}
