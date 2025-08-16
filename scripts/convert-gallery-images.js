import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter __dirname equivalente para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações - Pasta específica da galeria
const INPUT_DIR = path.join(__dirname, '..', 'imagens', 'WhatsApp Unknown 2025-08-16 at 01.50.25');
const OUTPUT_DIR = path.join(__dirname, '..', 'client', 'public', 'images');
const QUALITY = 80; // Qualidade do WebP (0-100)
const NEW_PREFIX = 'galeria_afroturistica';

// Criar diretório de saída se não existir
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Verificar se a pasta de entrada existe
if (!fs.existsSync(INPUT_DIR)) {
  console.error(`❌ Pasta de entrada não encontrada: ${INPUT_DIR}`);
  console.log('📁 Verifique se o caminho está correto:');
  console.log('   ./imagens/WhatsApp Unknown 2025-08-16 at 01.50.25');
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
async function convertGalleryImages() {
  console.log('🖼️ Iniciando conversão das imagens da galeria...\n');
  console.log(`📁 Pasta de entrada: ${INPUT_DIR}`);
  console.log(`📁 Pasta de saída: ${OUTPUT_DIR}\n`);
  
  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  ).sort(); // Ordenar para manter consistência
  
  if (imageFiles.length === 0) {
    console.log('📁 Nenhuma imagem encontrada para converter');
    console.log('💡 Formatos suportados: .jpg, .jpeg, .png');
    return;
  }
  
  console.log(`📊 Encontradas ${imageFiles.length} imagens para converter:\n`);
  
  // Mostrar mapeamento atual
  imageFiles.forEach((file, index) => {
    const newName = `${NEW_PREFIX}_${index + 1}.webp`;
    console.log(`   ${index + 1}. ${file} → ${newName}`);
  });
  
  console.log('\n🔄 Iniciando conversão...\n');
  
  // Converter cada arquivo
  for (let i = 0; i < imageFiles.length; i++) {
    const oldName = imageFiles[i];
    const newName = `${NEW_PREFIX}_${i + 1}.webp`;
    
    const inputPath = path.join(INPUT_DIR, oldName);
    const outputPath = path.join(OUTPUT_DIR, newName);
    
    await convertImage(inputPath, outputPath);
  }
  
  console.log(`\n🎉 Conversão concluída! ${imageFiles.length} imagens convertidas`);
  console.log(`📁 Arquivos salvos em: ${OUTPUT_DIR}`);
  console.log('\n💡 Para usar na galeria:');
  console.log(`   <img src="/images/${NEW_PREFIX}_1.webp" alt="Galeria Afroturística 1" />`);
  console.log(`   <img src="/images/${NEW_PREFIX}_2.webp" alt="Galeria Afroturística 2" />`);
  console.log(`   // ... e assim por diante`);
}

// Executar conversão
convertGalleryImages().catch(console.error);
