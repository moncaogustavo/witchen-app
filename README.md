# PROJETO-GS

## Witchen - Smart Restaurant App

Aplicativo React Native com **Expo** para gerenciamento de restaurantes.

## 🚀 Como rodar o projeto (Expo)

### Pré-requisitos
- Node.js instalado (versão 16 ou superior)
- Expo CLI instalado globalmente: `npm install -g expo-cli`
- **OU** use o Expo Go no seu celular (mais fácil!)

### Instalação

1. **Entre na pasta do projeto:**
```bash
cd witchen
```

2. **Instale as dependências:**
```bash
npm install
```

### Executar o projeto

#### Opção 1: Usando Expo Go no celular (Mais fácil! 📱)

1. **Instale o app Expo Go no seu celular:**
   - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Inicie o servidor:**
```bash
npm start
```

3. **Escaneie o QR Code:**
   - **Android**: Abra o Expo Go e escaneie o QR code que aparece no terminal
   - **iOS**: Abra a câmera e escaneie o QR code, depois abra no Expo Go

#### Opção 2: Usando emulador/simulador

**Para Android:**
```bash
npm run android
```
(Precisa ter Android Studio e um emulador configurado)

**Para iOS (apenas Mac):**
```bash
npm run ios
```
(Precisa ter Xcode instalado)

**Para Web:**
```bash
npm run web
```

### Ver mudanças em tempo real

Com Expo, as mudanças aparecem **automaticamente** quando você salva o arquivo! Não precisa recarregar manualmente.

- **Fast Refresh**: Habilitado por padrão
- **Hot Reload**: Funciona automaticamente
- **Shake device**: Agite o celular para abrir o menu de desenvolvedor

### Comandos úteis

```bash
npm start          # Inicia o servidor Expo
npm start --clear   # Limpa o cache e inicia
npm run android     # Abre no emulador Android
npm run ios         # Abre no simulador iOS
npm run web         # Abre no navegador
```

### Estrutura do Projeto

```
witchen/
├── App.js                 # Componente principal
├── index.js               # Ponto de entrada (Expo)
├── app.json               # Configuração do Expo
├── package.json           # Dependências e scripts
└── src/
    ├── animations/        # Componentes de animação
    ├── api/              # Configuração da API
    ├── components/       # Componentes reutilizáveis
    ├── contexts/         # Contextos React (AuthContext)
    ├── navigation/       # Configuração de navegação
    ├── screens/          # Telas do aplicativo
    └── styles/           # Estilos globais
```

## ✅ Vantagens do Expo

- ✅ **Não precisa** das pastas `android/` e `ios/`
- ✅ **Mais fácil** de configurar e rodar
- ✅ **Teste rápido** no celular com Expo Go
- ✅ **Hot Reload** automático
- ✅ **Menos configuração** necessária

## 📱 Próximos passos

1. Execute `npm install` para instalar as dependências
2. Execute `npm start` para iniciar o servidor
3. Escaneie o QR code com o Expo Go no seu celular
4. Comece a desenvolver! 🎉
# witchen-app
