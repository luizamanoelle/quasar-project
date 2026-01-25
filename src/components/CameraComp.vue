<template>
  <div class="flex flex-col items-center w-full max-w-2xl mx-auto">
    <div
      class="relative w-full aspect-[3/4] mb:aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
    >
      <!--recebe a camera automaticamente -->
      <video ref="video" autoplay playsinline muted hidden></video>
      <!--desenha o video -->
      <canvas ref="canvas" class="w-full h-full object-cover"></canvas>

      <!--quadradinhos-->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3">
        <div v-for="i in 9" :key="i" class="border border-white/5"></div>
      </div>
    </div>

    <div class="flex flex-col items-center gap-8 mt-5">
      <span class="text-slate-400 text-xs font-bold uppercase tracking-widest">
        Posicione o problema no centro
      </span>

      <!--botao pra carregar uma imagem-->
      <div class="flex items-center gap-8">
        <q-btn
          rounded
          text-color="black"
          color="white"
          icon="collections"
          label="Escolher da Galeria"
          @click="triggerFilePicker"
        />

        <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="onFilePicked" />
      </div>

      <button
        @click="TakePicture"
        class="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1"
      >
        <div class="w-full h-full bg-white rounded-full"></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useLocationStore } from 'src/stores/location';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const locationStore = useLocationStore();
const router = useRouter();
const $q = useQuasar();

defineOptions({ name: 'CameraComp' });

const canvas = ref<HTMLCanvasElement | null>(null);
const video = ref<HTMLVideoElement | null>(null);
//desenhar dentro do canvas a imagem
const ctx = ref<CanvasRenderingContext2D | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const triggerFilePicker = () => fileInput.value?.click();
const activeStream = ref<MediaStream | null>(null);

const constraints = ref({
  video: {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
  },
  audio: false,
});

//pegar imagem da galeria
const onFilePicked = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      locationStore.addPhoto(e.target?.result as string);
      void router.push('/citizen/report');
    };
    reader.readAsDataURL(file);
  }
};

function setStream(stream: MediaStream) {
  if (video.value) {
    //coloca o video na tela
    video.value.srcObject = stream;
    video.value
      .play()
      .then(() => {
        //redimenciona
        resizeCanvas();
        //desenha os frames
        requestAnimationFrame(draw);
      })
      .catch((err) => console.error('Erro ao dar play no vídeo:', err));
  }
}

function draw() {
  if (ctx.value && video.value && video.value.readyState === 4) {
    // readyState 4 = assume que a conexão vai ficar estavel
    ctx.value.drawImage(video.value, 0, 0, canvas.value!.width, canvas.value!.height);
  }
  //vai desenhando
  requestAnimationFrame(draw);
}

//reposicionar a camera com a tela
function resizeCanvas() {
  if (!canvas.value || !video.value) return;

  //pega os valores da tela
  const width = canvas.value.clientWidth;

  const height = width * (4 / 3);

  // Definimos a resolução interna do desenho
  canvas.value.width = video.value.videoWidth || width;
  canvas.value.height = video.value.videoHeight || height;
}

function TakePicture() {
  const ex = canvas.value;
  if (!ex) return;

  //converte a imagem com o toData
  const photoBase64 = ex.toDataURL('image/png');

  locationStore.addPhoto(photoBase64);

  $q.notify({
    message: 'Foto adicionada!',
    color: 'positive',
    icon: 'photo_camera',
    timeout: 500,
  });

  void router.push('/citizen/report');
}

onMounted(async () => {
  if (video.value && canvas.value) {
    ctx.value = canvas.value.getContext('2d');

    //sempre que a janela for redimencionada chama o resize
    window.addEventListener('resize', resizeCanvas);

    try {
      //pede permissao e pega a webcam/cam e passa os valores de audio e video
      //espera a camera
      const stream = await navigator.mediaDevices.getUserMedia(constraints.value);
      activeStream.value = stream;
      setStream(stream);
    } catch (e) {
      console.error(e);
    }
  }
});

onUnmounted(() => {
  // Remove o ouvinte de evento para evitar vazamento de memória
  window.removeEventListener('resize', resizeCanvas);

  // Desliga cada trilha da câmera (vídeo)
  if (activeStream.value) {
    activeStream.value.getTracks().forEach((track) => {
      track.stop();
      console.log('Câmera desligada:', track.label);
    });
  }
});
</script>
