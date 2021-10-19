import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: var(--shape);
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 0;
    margin-bottom: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }

  .DayPicker-NavButton {
    top: 0.9rem;
  }

  .DayPicker-NavButton--prev {
    margin-left: 1.5em;
    right: auto;
  }

  .DayPicker-Caption {
    text-align: center;
    background: var(--orange);
    height: 50px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    div {
      line-height: 50px;
    }
  }
`;
