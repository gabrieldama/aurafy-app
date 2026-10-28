import { StyleSheet, Text, View } from 'react-native';
import { paleta } from '@/constants/paleta';

export default function Pesquisar() {
    return (
        <View style={s.tela}>
            <Text style={s.txt}>Pesquisar (em breve)</Text>
        </View>
    );
}

const s = StyleSheet.create({
    tela: { flex: 1, backgroundColor: paleta.fundo, alignItems: 'center', justifyContent: 'center' },
    txt: { color: paleta.textoApagado, fontSize: 16 },
});