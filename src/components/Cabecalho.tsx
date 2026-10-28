import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { paleta } from '@/constants/paleta';

export function Cabecalho() {
    const insets = useSafeAreaInsets();
    return (
        <View style={[s.cabecalho, { paddingTop: insets.top + 8 }]}>
            <Text style={s.marca}>aurafy</Text>
            <View style={s.acoes}>
                <Ionicons name="notifications-outline" size={22} color={paleta.texto} />
                <Ionicons name="time-outline" size={22} color={paleta.texto} />
                <Ionicons name="settings-outline" size={22} color={paleta.texto} />
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    cabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    marca: { fontSize: 26, fontWeight: '900', letterSpacing: -0.5, color: paleta.destaque },
    acoes: { flexDirection: 'row', gap: 18 },
});