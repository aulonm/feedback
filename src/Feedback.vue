<template>
  <div>
    <button class="ok-feedback__btn" @click="openModal">
      <icon-chat class="ok-feedback__icon--chat" />
      {{ label }}
    </button>

    <div class="ok-feedback__modal" v-if="isOpen">
      <div class="ok-feedback__modal--outer" aria-hidden="true" tabindex="0" @keydown.esc="closeModal"></div>

      <div class="ok-feedback__modal--inner">
        <div class="ok-feedback__section--header">
          <button class="ok-feedback__section--header-btn" @click="closeModal">
            <icon-cross class="ok-feedback__icon--cross" />
          </button>
          <h2>Hei!</h2>
          <h3 class="title">Hvor fornøyd er du med denne tjenesten?</h3>
        </div>

        <form>
          <div class="ok-feedback__section--smiley">
            <button @click.prevent="smileyClicked(3)">
              <icon-sad class="ok-feedback__icon--smiley" />
            </button>
            <button @click.prevent="smileyClicked(2)">
              <icon-neutral class="ok-feedback__icon--smiley" />
            </button>
            <button @click.prevent="smileyClicked(1)">
              <icon-smile class="ok-feedback__icon--smiley" />
            </button>
            <p class="ok-feedback__section--smiley-text">{{ getSmileyText }}</p>
          </div>

          <div v-if="smiley !== null" class="ok-feedback__section--feedback">
            <textarea
              class="ok-feedback__section--feedback-textarea"
              :placeholder="getFeedbackQuestionText"
              v-model="feedback"
              rows="10"
              cols="45"
            >
            </textarea>
            <div class="ok-feedback__section--feedback-submit">
              <span v-if="feedback.length === 0" class="ok-feedback__section--feedback-submit-empty">
                Skriv en kommentar før du sender tilbakemeldingen.
              </span>

              <spinner v-else-if="saving"></spinner>

              <button v-else class="ok-feedback__section--feedback-submit-btn" :disabled="saving" type="submit">
                Send inn
              </button>
            </div>
          </div>
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
import Spinner from './components/Spinner.vue';

export default {
  name: 'feedback',

  components: {
    IconChat: chat,
    IconSmile: smile,
    IconSad: sad,
    IconNeutral: neutral,
    IconCross: cross,
    Spinner,
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
    reset() {
      this.feedback = '';
      this.saving = false;
      this.smiley = null;
    },

    openModal() {
      this.isOpen = true;
    },

    closeModal() {
      this.isOpen = false;
      this.reset();
    },

    smileyClicked(number) {
      this.smiley = number;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './styles/_reset.scss';

.ok-feedback__btn {
  position: fixed;
  right: 6rem;
  bottom: 0;
  padding: 0.5rem 1.5rem;
  color: #000000;
  font-weight: 700;
  background: #f9c66b;
  border: 1px solid #f8f0dd;
  cursor: pointer;
}

.ok-feedback__modal {
  /* modal container fixed across whole screen */
  position: fixed;
  right: 0;
  bottom: 0;

  /* z-index must be higher than .feedback-modal-background */
  z-index: 1000;

  /* enables scrolling for tall modals */
  overflow: auto;
}

.ok-feedback__modal--inner {
  position: relative;

  z-index: 800;
  display: flex;
  flex-direction: column;
  min-width: 18rem;
  max-width: 34rem;
  margin: 30px;
  padding: 30px;

  &:focus {
    outline: none;
  }
}

.ok-feedback__modal--outer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 500;
  background: rgba(black, 0.7);

  &:focus {
    outline: none;
  }
}

.ok-feedback__section--header {
  padding: 30px;
  background: #43f8b6;

  &-btn {
    position: absolute;
    top: 35px;
    right: 35px;
    background-color: #43f8b6;
    border: none;
  }
}

.ok-feedback__section--smiley {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 30px 10px;
  background: #f5f5f5;

  &-text {
    width: 7rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}

.ok-feedback__section--feedback {
  padding: 10px 30px 40px;
  background: #ffffff;

  &-textarea {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: medium;
    resize: none;
  }

  &-submit {
    display: flex;
    justify-content: flex-end;

    &-empty {
      padding-top: 20px;
      color: #ff8274;
    }

    &-btn {
      padding: 10px 15px 10px;
      font-weight: normal;
      background: #43f8b6;
      min-width: 5rem;
    }
  }
}

.ok-feedback__icon--chat {
  width: 20px;
  height: 15px;
  padding-right: 5px;
  vertical-align: middle;
}

.ok-feedback__icon--smiley {
  width: 35px;
  height: 35px;
  transform: scale(1);
  transition: 0.2s transform;

  &:hover {
    transform: scale(1.25);
    transition: 0.2s transform;
  }
}

.ok-feedback__icon--cross {
  width: 20px;
  height: 20px;
}
</style>
