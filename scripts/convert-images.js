import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter __dirname equivalente para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações - Pasta específica do usuário
const INPUT_DIR = path.join(__dirname, '..', 'imagens', 'WhatsApp Unknown 2025-08-16 at 01.51.29');
const OUTPUT_DIR = path.join(__dirname, '..', 'client', 'public', 'images');
const QUALITY = 80; // Qualidade do WebP (0-100)

// Criar diretório de saída se não existir
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Verificar se a pasta de entrada existe
if (!fs.existsSync(INPUT_DIR)) {
  console.error(`❌ Pasta de entrada não encontrada: ${INPUT_DIR}`);
  console.log('📁 Verifique se o caminho está correto:');
  console.log('   ./imagens/WhatsApp Unknown 2025-08-16 at 01.51.29');
  process.exit(1);
}

// Função para converter imagem
async function convertImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    console.log(`✅ Convertido: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`❌ Erro ao converter ${inputPath}:`, error.message);
  }
}

// Função principal
async function convertAllImages() {
  console.log('🖼️ Iniciando conversão de imagens...\n');
  console.log(`📁 Pasta de entrada: ${INPUT_DIR}`);
  console.log(`📁 Pasta de saída: ${OUTPUT_DIR}\n`);
  
  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );
  
  if (imageFiles.length === 0) {
    console.log('📁 Nenhuma imagem encontrada para converter');
    console.log('💡 Formatos suportados: .jpg, .jpeg, .png');
    return;
  }
  
  console.log(`📊 Encontradas ${imageFiles.length} imagens para converter:\n`);
  
  // Mostrar lista de arquivos
  imageFiles.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
  });
  
  console.log('\n🔄 Iniciando conversão...\n');
  
  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputName = path.parse(file).name + '.webp';
    const outputPath = path.join(OUTPUT_DIR, outputName);
    
    await convertImage(inputPath, outputPath);
  }
  
  console.log(`\n🎉 Conversão concluída! ${imageFiles.length} imagens convertidas`);
  console.log(`📁 Arquivos salvos em: ${OUTPUT_DIR}`);
  console.log('\n💡 Para usar no seu site:');
  console.log(`   <OptimizedImage src="/images/${imageFiles[0].replace(/\.[^/.]+$/, '')}.webp" alt="Descrição" />`);
}

// Executar conversão
convertAllImages().catch(console.error);
