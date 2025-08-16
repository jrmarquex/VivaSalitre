#!/bin/bash

echo "🖼️ Configurando sistema de imagens otimizadas..."

# Instalar Sharp para conversão de imagens
echo "📦 Instalando Sharp..."
npm install sharp

# Criar diretórios necessários
echo "📁 Criando diretórios..."
mkdir -p client/public/images
mkdir -p scripts

echo "✅ Configuração concluída!"
echo ""
echo "🚀 Para converter suas imagens:"
echo "   npm run convert-images"
echo ""
echo "📁 Suas imagens convertidas estarão em: client/public/images/"
