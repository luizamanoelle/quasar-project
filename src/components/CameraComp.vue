<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <!--recebe a camera automaticamente -->
        <video ref="video" autoplay playsinline muted hidden></video>
        <!--desenha o video -->
        <canvas ref="canvas" width="1280" height="720" class="rounded-3x1"></canvas>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineOptions({ name: 'CameraComp' });

const canvas = ref<HTMLCanvasElement | null>(null);
const video = ref<HTMLVideoElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

//sem mic
const constraints = ref({
  audio: false,
  video: true,
});

onMounted(async () => {
  if (video.value && canvas.value) {
    ctx.value = canvas.value.getContext('2d');

    try {
      //pega a webcam/cam e passa os valores de audio e video
      const stream = await navigator.mediaDevices.getUserMedia(constraints.value);
      setStream(stream);
    } catch (e) {
      console.error(e);
    }
  }
});

function setStream(stream: MediaStream) {
  if (video.value) {
    video.value.srcObject = stream;
    video.value
      .play()
      .then(() => {
        requestAnimationFrame(draw);
      })
      .catch((err) => console.error('Erro ao dar play no vídeo:', err));
  }
}

function draw() {
  if (ctx.value && video.value && video.value.readyState === 4) {
    // readyState 4 = HAVE_ENOUGH_DATA
    ctx.value.drawImage(video.value, 0, 0, canvas.value!.width, canvas.value!.height);
  }
  requestAnimationFrame(draw);
}
</script>
