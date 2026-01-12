<template>
  <q-page padding>
    <p class="text-h6">Camera</p>
    <div class="row">
      <div class="col-12">
        <video ref="video" autoplay playsinline webkit-playsinLine muted hidden></video>
        <canvas ref="canvas" width="1280" height="720" class="rounded-3x1"></canvas>
        <div class="flex items-center justify-center py-4">
          <button
            class="px-6 py-4 bg-green-500 rounded text-white text-2x1 uppercase font-bold hover:bg-green-600"
          >
            take a picture
          </button>
        </div>
      </div>
      <div class="col-12">
        <q-btn label="Acessar Camera"></q-btn>
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

const constraints = ref({
  audio: false,
  video: true,
});

onMounted(async () => {
  if (video.value && canvas.value) {
    ctx.value = canvas.value.getContext('2d');

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints.value);
      setStream(stream);
    } catch (e) {
      console.error('Erro ao acessar câmera:', e);
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
