import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl, Button } from '@wordpress/components';
import { image } from '@wordpress/icons';

import './editor.scss';

export default function Edit(props) {
	const { attributes, setAttributes,clientId } = props;
	const { blockID, imgID, imgSrc, imgAlt, imgWidth, imgHeight, imgSrcset, imgSizes, headline, subHeadline, headlineTag, contentPosition } = attributes;

	setAttributes({ blockID: !blockID ? clientId : blockID });

	const onSelectBgImage = img => {
		setAttributes({
			imgID: img.id,
			imgSrc: img.url,
			imgAlt: img.alt || 'Background Image',
			// imgWidth: img.width,
			// imgHeight: img.height
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

	return (
		<>
			<InspectorControls>
				<PanelBody title="Background Image" icon={ image } initialOpen={ true }>
					<img src={ imgSrc } alt={ imgAlt } srcset="" sizes="" loading="lazy"/>
					<MediaUpload
							onSelect={ onSelectBgImage }
							allowedTypes={ [ 'image' ] }
							value={ imgID }
							render={({ open }) => (
								<>
									<Button
										className={ `hp-custom-btn ${!imgID ? 'editing' : 'preview'}` }
										onClick={ open }
									>
										{ !imgID && 'Set Image'}
										{ !!imgID && imgSrc && 'Change Image' }
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
				<PanelBody title="Headline Tag" initialOpen={ false }>
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
					<PanelRow>
						icon upload
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<section { ...useBlockProps({
				id: blockID,
				className: `hp-showcase-block`
			}) }>
				<div class="container">
					<div class="hp-custom-showcase-block__info">
						<RichText
							tagName={ headlineTag }
							value={ headline }
							onChange={ val => setAttributes({ headline: val }) }
						/>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dicta simi</p>
						<a href="#">Learn More</a>
					</div>
					<img src={ imgSrc } alt={ imgAlt } srcset="" sizes="" loading="lazy" />
				</div>
			</section>
		</>
	);
}
