import { Image } from 'react-native';

const arquivo = require('../../assets/images/logo.png');

// proporcao = largura ÷ altura da sua imagem (ex.: 420x120 → 3.5)
export function Logo({ altura = 30, proporcao = 3.5 }: { altura?: number; proporcao?: number }) {
    return (
        <Image
            source={arquivo}
            style={{ height: altura, width: altura * proporcao }}
            resizeMode="contain"
            accessibilityLabel="aurafy"
        />
    );
}