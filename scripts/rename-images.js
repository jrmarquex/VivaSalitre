import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter __dirname equivalente para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const IMAGES_DIR = path.join(__dirname, '..', 'client', 'public', 'images');
const NEW_PREFIX = 'parceiro_afroturistico';

// Função para renomear imagens
async function renameImages() {
  console.log('🔄 Iniciando renomeação das imagens...\n');
  
  // Verificar se a pasta existe
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Pasta de imagens não encontrada: ${IMAGES_DIR}`);
    return;
  }
  
  // Ler todos os arquivos da pasta
  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter(file => 
    /\.(webp|jpg|jpeg|png)$/i.test(file)
  ).sort(); // Ordenar para manter consistência
  
  if (imageFiles.length === 0) {
    console.log('📁 Nenhuma imagem encontrada para renomear');
    return;
  }
  
  console.log(`📊 Encontradas ${imageFiles.length} imagens para renomear:\n`);
  
  // Mostrar mapeamento atual
  imageFiles.forEach((file, index) => {
    const newName = `${NEW_PREFIX}_${index + 1}.webp`;
    console.log(`   ${index + 1}. ${file} → ${newName}`);
  });
  
  console.log('\n🔄 Iniciando renomeação...\n');
  
  // Renomear cada arquivo
  for (let i = 0; i < imageFiles.length; i++) {
    const oldName = imageFiles[i];
    const newName = `${NEW_PREFIX}_${i + 1}.webp`;
    
    const oldPath = path.join(IMAGES_DIR, oldName);
    const newPath = path.join(IMAGES_DIR, newName);
    
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`✅ Renomeado: ${oldName} → ${newName}`);
    } catch (error) {
      console.error(`❌ Erro ao renomear ${oldName}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Renomeação concluída! ${imageFiles.length} imagens renomeadas`);
  console.log(`📁 Todas as imagens agora seguem o padrão: ${NEW_PREFIX}_1.webp, ${NEW_PREFIX}_2.webp, etc.`);
  
  console.log('\n💡 Para usar no seu site:');
  console.log(`   <OptimizedImage src="/images/${NEW_PREFIX}_1.webp" alt="Parceiro Afroturístico 1" />`);
  console.log(`   <OptimizedImage src="/images/${NEW_PREFIX}_2.webp" alt="Parceiro Afroturístico 2" />`);
  console.log(`   // ... e assim por diante`);
}

// Executar renomeação
renameImages().catch(console.error);
