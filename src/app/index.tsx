import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import banner from '../../assets/images/banner.png';
import { paleta } from '@/constants/paleta';
import { Logo } from '@/components/Logo';

export default function Inicio() {
  const insets = useSafeAreaInsets();

  return (
    <View style={s.tela}>
      <View style={s.fotoBox}>
        <Image source={banner} style={StyleSheet.absoluteFill} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(18,18,18,0)', 'rgba(18,18,18,0.85)', paleta.fundo]}
          style={s.degrade}
        />
      </View>

      <View style={[s.conteudo, { paddingBottom: insets.bottom + 24 }]}>
        <View>
          <Logo altura={48} />
          <Text style={s.slogan}>Suas músicas e playlists favoritas. Ouça onde quiser.</Text>
        </View>

        <Pressable
          style={({ pressed }) => [s.entrar, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]}
          onPress={() => router.replace('/inicio')}
        >
          <Text style={s.entrarTxt}>Entrar</Text>
          <View style={s.seta}>
            <Ionicons name="arrow-forward" size={20} color={paleta.destaque} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo },

  fotoBox: { height: '62%', backgroundColor: paleta.superficie },
  degrade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%' },

  conteudo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: -56,
  },
  slogan: { fontSize: 20, lineHeight: 28, fontWeight: '600', color: paleta.texto, marginTop: 14 },

  entrar: {
    height: 58,
    borderRadius: 29,
    paddingLeft: 28,
    paddingRight: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: paleta.destaque,
    shadowColor: paleta.destaque,
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  entrarTxt: { fontSize: 19, fontWeight: '700', color: paleta.branco },
  seta: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: paleta.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
});