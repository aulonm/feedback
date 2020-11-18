<template>
  <div class="feedback">
    <button class="openbtn" @click="openModal">
      <icon-chat class="icon__chat" />
      {{ label }}
    </button>

    <div class="custom-feedback-modal" v-if="isOpen">
      <div class="modal__outer" aria-hidden="true" tabindex="0" @keydown.esc="closeModal"></div>

      <div class="modal__inner">
        <button class="closebtn" @click="closeModal">
          <icon-cross class="icon__cross" />
        </button>

        <form>
          <div class="headerarea">
            <h2>Hei!</h2>
            <h3 class="title">Hvor fornøyd er du med denne tjenesten?</h3>
          </div>

          <div class="smileyarea">
            <div class="smileyrow">
              <div class="smileycolumn">
                <button @click.prevent="smileyClicked(3)">
                  <icon-sad class="icon__smiley" />
                </button>
              </div>
              <div class="smileycolumn">
                <button @click.prevent="smileyClicked(2)">
                  <icon-neutral class="icon__smiley" />
                </button>
              </div>
              <div class="smileycolumn">
                <button @click.prevent="smileyClicked(1)">
                  <icon-smile class="icon__smiley" />
                </button>
              </div>
              <div class="lastcolumn">
                <p>{{ getSmileyText }}</p>
              </div>
            </div>
          </div>

          <template v-if="smiley !== null">
            <div class="feedbackarea">
              <textarea :placeholder="getFeedbackQuestionText" v-model="feedback" rows="10" cols="45"> </textarea>
              <div v-if="feedback.length === 0" class="sendinncontainer">
                <span class="nocomment">Skriv en kommentar før du sender tilbakemeldingen.</span>
              </div>
              <div v-else class="sendinncontainer">
                <button class="sendinn" :disabled="saving" :class="{ verified: true }" type="submit">Send inn</button>
              </div>
              <div v-if="saving" class="sendinncontainer">
                <span>spinner 4lyfe</span>
              </div>
            </div>
          </template>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import chat from './components/chat.svg';
import neutral from './components/neutral.svg';
import sad from './components/sad.svg';
import smile from './components/smile.svg';
import cross from './components/cross.svg';

export default {
  name: 'feedback',

  components: {
    IconChat: chat,
    IconSmile: smile,
    IconSad: sad,
    IconNeutral: neutral,
    IconCross: cross,
  },

  data: () => ({
    label: 'Tilbakemelding',
    isOpen: false,
    smiley: null,
    feedback: '',
    saving: false,
  }),

  computed: {
    getSmileyText() {
      if (this.smiley === 1) {
        return 'Veldig fornøyd';
      }
      if (this.smiley === 2) {
        return 'Passe fornøyd';
      }
      if (this.smiley === 3) {
        return 'Lite fornøyd';
      }
      return '';
    },

    getFeedbackQuestionText() {
      if (this.smiley === 3) {
        return 'Hvorfor er du misfornøyd? Ikke skriv inn informasjon som kan identifisere deg eller andre. Din tilbakemelding er anonym, og vi vil ikke besvare den.';
      }
      return 'Har du forslag til forbedringer? Ikke skriv inn informasjon som kan identifisere deg eller andre. Din tilbakemelding er anonym, og vi vil ikke besvare den.';
    },
  },

  methods: {
    openModal() {
      this.isOpen = true;
    },

    closeModal() {
      this.isOpen = false;
    },

    smileyClicked(number) {
      this.smiley = number;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './styles/_reset.scss';

.custom-feedback-modal {
  /* modal container fixed across whole screen */
  position: fixed;
  right: 0;
  bottom: 0;

  /* z-index must be higher than .feedback-modal-background */
  z-index: 1000;

  /* enables scrolling for tall modals */
  overflow: auto;

  .headerarea {
    padding: 30px;
    background: #43f8b6;
  }

  .smileyarea {
    background: #f5f5f5;
    padding: 10px 30px 10px;

    .smileycolumn {
      float: left;
      width: 20%;

      .smiley {
        border-radius: 15px;
        cursor: pointer;
      }

      .smiley:hover {
        transform: scale(1.25);
      }
    }

    .lastcolumn {
      float: left;
      width: 40%;
    }

    /* Clear floats after the columns */
    .smileyrow:after {
      content: '';
      display: table;
      clear: both;
    }
  }

  .feedbackarea {
    background: #ffffff;
    padding: 10px 30px 40px;

    textarea {
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: medium;
      border: none;
      resize: none;
    }

    .sendinncontainer {
      margin-top: 20px;

      .sendinn {
        background: #43f8b6;
        border-color: #4e807c;
        border: none;
        border-top: 1px solid #d0bfae;
        border-left: 1px solid #d0bfae;
        border-right: 1px solid #d0bfae;
        font-weight: normal;
        font-size: large;
        position: relative;
        float: right;
        bottom: 30px;
        padding: 10px 15px 10px;
      }

      .nocomment {
        float: right;
        color: darkred;
      }

      .spinner {
        float: right;
        bottom: 20px;
        right: 35px;
      }

      .sendinn.verified {
        background: #7bfacb;
        cursor: pointer;
      }
    }
  }

  .modal__inner {
    position: relative;
    padding: 30px;

    /* margin exposes part of the modal background */
    margin: 30px;

    z-index: 950;

    .closebtn {
      background-color: #43f8b6;
      position: absolute;
      top: 35px;
      right: 35px;
      border: none;
    }
  }
}

.modal__outer {
  /* modal background fixed across whole screen */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  /* semi-transparent black  */
  background-color: #000;
  opacity: 0.75;

  /* z-index must be below .feedback-modal and above everything else  */
  z-index: 900;
}

.feedback {
  .openbtn {
    border-width: 1px;
    border-style: solid;
    border-color: #f8f0dd;
    font-size: small;
    font-weight: bold;
    background: #f9c66b;
    color: #000000;
    padding: 10px 20px;
    position: fixed;
    bottom: 0px;
    right: 100px;
    cursor: pointer;
  }
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.spinner:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  border-top-color: #000000;
  animation: spinner 0.8s linear infinite;
}

.icon__chat {
  width: 20px;
  height: 15px;
  vertical-align: middle;
  padding-right: 5px;
}

.icon__smiley {
  width: 35px;
  height: 35px;
}

.icon__cross {
  width: 20px;
  height: 20px;
}

.face-enter,
.fade-leave-active {
  opacity: 0;
}

.fade-enter-active,
.face-leave-active {
  transition: opacity 0.2s ease-out;
}
</style>
