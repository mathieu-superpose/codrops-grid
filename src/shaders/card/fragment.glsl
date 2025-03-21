uniform sampler2D uTexture;
uniform float uDistance;

varying vec2 vUv;

vec3 getLuminance(vec3 color) {
    // vec3 luminance = vec3(0.2126, 0.7152, 0.0722);
    vec3 luminance = vec3(0.2, 0.75, 0.1) / 2.;
    return vec3(dot(luminance, color));
}

vec3 alteredColors(vec3 inputColor) {
    const mat3 Mat = mat3(0.5, 0.5, 0.1, 0.5, 0.1, 0.1, 0.1, 0.5, 0.1);

    return inputColor * Mat;
}

void main() {
    vec4 image = texture(uTexture, vUv);
    float distanceFactor = min(max(uDistance, 0.), 1.);

    vec3 imageLum = getLuminance(image.xyz);

    vec3 texColor = alteredColors(image.xyz);

    vec3 color = mix(texColor, imageLum, distanceFactor);

    gl_FragColor = vec4(color, 1.0);
}