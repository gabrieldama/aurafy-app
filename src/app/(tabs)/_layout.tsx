import { ComponentProps } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { paleta } from '@/constants/paleta';

type NomeIcone = ComponentProps<typeof Ionicons>['name'];

const icone =
    (ativo: NomeIcone, inativo: NomeIcone) =>
        ({ color, focused }: { color: string; focused: boolean }) =>
            <Ionicons name={focused ? ativo : inativo} size={24} color={color} />;

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: paleta.texto,
                tabBarInactiveTintColor: paleta.textoApagado,
                tabBarStyle: {
                    backgroundColor: paleta.fundo,
                    borderTopColor: paleta.borda,
                },
                tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
            }}
        >
            <Tabs.Screen name="inicio" options={{ title: 'Início', tabBarIcon: icone('home', 'home-outline') }} />
            <Tabs.Screen name="pesquisar" options={{ title: 'Pesquisar', tabBarIcon: icone('search', 'search-outline') }} />
            <Tabs.Screen name="playlists" options={{ title: 'Playlists', tabBarIcon: icone('albums', 'albums-outline') }} />
        </Tabs>
    );
}