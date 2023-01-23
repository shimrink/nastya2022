import { shaderMaterial } from "@react-three/drei"

const CustomMaterial = shaderMaterial(
	// Uniforms
	{
		uTexture: undefined,
		uScale: 0,
		uShift: 0,
		uZoom: 0
	},
	// Vertex Shader
	`
		precision mediump float;

		varying vec2 vUv;
		uniform float uScale;
		uniform float uShift;
		uniform float uZoom;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
	// Fragment Shader
	`
		precision mediump float;

		uniform sampler2D uTexture;
		uniform float uScale;
		uniform float uShift;
		uniform float uZoom;
		varying vec2 vUv;

		void main() {
			float angle = 1.55;
			vec2 p = (vUv - vec2(0.5, 0.5)) * uZoom  + vec2(0.5, 0.5);
			vec2 pf = p - vec2(-0.2, 0.2) * uScale;
			vec2 offset = uShift / 4.0 * vec2(cos(angle), sin(angle));
			vec4 cr = texture2D(uTexture, pf + offset);
			vec4 cga = texture2D(uTexture, pf);
			vec4 cb = texture2D(uTexture, pf - offset);
			gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
		}
	`
);

export default CustomMaterial