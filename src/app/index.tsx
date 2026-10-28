import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { paleta } from '@/constants/paleta';
import { Logo } from '@/components/Logo';

export default function Inicio() {
  const insets = useSafeAreaInsets();

  return (
    <View style={s.tela}>
      <View style={s.fotoBox} />

      <LinearGradient
        colors={['transparent', 'rgba(18,18,18,0.7)', paleta.fundo]}
        style={s.degrade}
      />

      <View style={[s.conteudo, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 }]}>
        <View style={s.textosBox}>
          <Logo altura={40} />
          <Text style={s.slogan}>Suas músicas e playlists favoritas. Ouça onde quiser.</Text>
        </View>

        <Pressable
          style={({ pressed }) => [s.entrar, pressed && s.entrarPressionado]}
          onPress={() => router.replace('/inicio')}
        >
          <Text style={s.entrarTxt}>Descobrir Músicas</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo },

  fotoBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: paleta.superficie
  },

  degrade: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '30%',
    height: '45%'
  },

  conteudo: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    zIndex: 2,
  },

  textosBox: {
    marginTop: '65%',
    alignItems: 'center',
  },

  slogan: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    color: paleta.texto,
    marginTop: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
  },

  entrar: {
    height: 54,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: paleta.destaque,
    gap: 8,
    marginBottom: 20,
  },
  entrarPressionado: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  entrarTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: paleta.branco
  },
});
