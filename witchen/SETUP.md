# 🔧 Guia de Configuração - Witchen

## Por que não consigo rodar?

O projeto React Native precisa das pastas nativas (`android/` e `ios/`) para funcionar. Se essas pastas não existem, você precisa gerá-las.

## ✅ Solução Passo a Passo

### 1. Verifique se você tem as pastas nativas

Execute no terminal dentro da pasta `witchen`:
```bash
dir android
dir ios
```

Se essas pastas não existirem, continue com os passos abaixo.

### 2. Instale as dependências

```bash
cd witchen
npm install
```

### 3. Gere as pastas nativas

**Opção A: Usar React Native CLI (Recomendado)**

```bash
# Instale o React Native CLI globalmente (se ainda não tiver)
npm install -g react-native-cli

# Crie um projeto temporário para copiar as pastas nativas
npx react-native init WitchenTemp --skip-install

# Copie as pastas android e ios
xcopy /E /I WitchenTemp\android witchen\android
xcopy /E /I WitchenTemp\ios witchen\ios

# Delete o projeto temporário
rmdir /S /Q WitchenTemp
```

**Opção B: Criar manualmente (Avançado)**

Se preferir, você pode criar as pastas manualmente seguindo a documentação do React Native, mas isso é mais complexo.

### 4. Configure o Android (se for usar Android)

1. Instale o Android Studio
2. Configure o Android SDK
3. Crie um emulador Android ou conecte um dispositivo físico
4. Configure a variável de ambiente `ANDROID_HOME`

### 5. Configure o iOS (apenas Mac, se for usar iOS)

1. Instale o Xcode
2. Instale o CocoaPods: `sudo gem install cocoapods`
3. Entre na pasta ios e instale as dependências:
```bash
cd ios
pod install
cd ..
```

### 6. Agora você pode rodar!

**Para Android:**
```bash
npm run android
```

**Para iOS (Mac):**
```bash
npm run ios
```

**Inicie o Metro Bundler (em outro terminal):**
```bash
npm start
```

## 🚨 Problemas Comuns

### Erro: "Could not find or load main class"
- Execute: `cd android && ./gradlew clean && cd ..`

### Erro: "SDK location not found"
- Configure a variável de ambiente `ANDROID_HOME` apontando para o SDK do Android

### Erro: "Command not found: pod"
- Instale o CocoaPods: `sudo gem install cocoapods`

### O app não carrega
- Certifique-se de que o Metro Bundler está rodando (`npm start`)
- Limpe o cache: `npm start -- --reset-cache`

