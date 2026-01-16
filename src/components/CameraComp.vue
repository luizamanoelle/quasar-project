<template>
  <div class="row flex-center column">
    <!--recebe a camera automaticamente -->
    <video ref="video" autoplay playsinline muted hidden></video>
    <!--desenha o video -->
    <canvas ref="canvas" class="camera-canvas"></canvas>

    <div class="q-pt-md">
      <q-btn
        rounded
        padding="sm"
        color="white"
        text-color="black"
        label="Escolher da Galeria"
        icon="upload"
        @click="TakePicture"
      />
    </div>

    <div class="q-pt-md relative">
      <q-btn outline round padding="xl" color="white" icon="photo_camera" @click="TakePicture" />
      <q-btn round padding="lg" class="absolute top-6 left-2" color="white" @click="TakePicture">
        <q-icon name="photo_camera" color="grey-10" />
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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

//sem mic
const constraints = ref({
  audio: false,
  video: true,
});

onMounted(async () => {
  if (video.value && canvas.value) {
    ctx.value = canvas.value.getContext('2d');

    //sempre que a janela for redimencionada chama o resize
    window.addEventListener('resize', resizeCanvas);

    try {
      //pede permissao e pega a webcam/cam e passa os valores de audio e video
      //espera a camera
      const stream = await navigator.mediaDevices.getUserMedia(constraints.value);
      setStream(stream);
    } catch (e) {
      console.error(e);
    }
  }
});

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
  if (!canvas.value) return;

  //pega os valores da tela
  const width = canvas.value.clientWidth;

  // Calculamos a altura baseada na proporção 16:9
  const height = width * (9 / 16);

  // Definimos a resolução interna do desenho
  canvas.value.width = width;
  canvas.value.height = height;
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

  void router.push('/report');
}
</script>
