import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl, Button } from '@wordpress/components';
import { image } from '@wordpress/icons';

import './editor.scss';

export default function Edit(props) {
	const { attributes, setAttributes,clientId } = props;
	const { 
		blockID, 
		imgID, imgSrc, imgAlt, imgWidth, imgHeight, imgSrcset, imgSizes, 
		iconID, iconSrc, iconAlt, iconWidth, iconHeight, 
		headline, subHeadline, headlineTag,
		contentPosition
	} = attributes;

	setAttributes({ blockID: !blockID ? clientId : blockID });

	const onSelectImage = img => {
		setAttributes({
			imgID: img.id,
			imgSrc: img.url,
			imgAlt: img.alt || 'Background Image',
			// imgWidth: img.width,
			// imgHeight: img.height
		})
	}

	const onSelectIcon = icon => {
		setAttributes({
			iconID: icon.id,
			iconSrc: icon.url,
			iconAlt: icon.alt || 'Icon',
			iconWidth: icon.width,
			iconHeight: icon.height
		})
	}

	const onRemoveImage = () => {
		setAttributes({
			imgID: null,
			imgSrc: "https://placehold.co/2000x900",
			imgAlt: null,
			// imgSrcset: null,
			// imgSizes: null
		})
	}

	const onRemoveIcon = () => {
		setAttributes({
			iconID: null,
			iconSrc: null,
			iconAlt: null,
		})
	}

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
										<img src={ imgSrc } alt={ imgAlt } srcset="" sizes="" loading="lazy"/>
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
					<PanelRow>
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
					</PanelRow>
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
			</InspectorControls>

			<section { ...useBlockProps({
				id: blockID,
				className: `hp-showcase-block`
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
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dicta simi</p>
						<a href="#">Learn More</a>
					</div>
					<img src={ imgSrc } alt={ imgAlt } srcset="" sizes="" loading="lazy" />
				</div>
			</section>
		</>
	);
}
