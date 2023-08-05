import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { image } from '@wordpress/icons';

import './editor.scss';

export default function Edit(props) {
	const { attributes, setAttributes,clientId } = props;
	const { blockID, imgSrc, imgAlt, imgSrcset, imgSizes, headline, subHeadline, headlineTag, contentPosition } = attributes;

	setAttributes({ blockID: !blockID ? clientId : blockID });

	return (
		<>
			<InspectorControls>
				<PanelBody title="Background Image" icon={ image } initialOpen={ true }>
					<PanelRow>
						test
					</PanelRow>
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
				{/* <PanelBody title="Spacing" initialOpen={ false }>
					<PanelRow>
						test 2
					</PanelRow>
				</PanelBody> */}
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
					{/* <img src="showcase-sample.jpg" alt="" srcset="" sizes="" loading="lazy"> */}
				</div>
			</section>
		</>
	);
}
