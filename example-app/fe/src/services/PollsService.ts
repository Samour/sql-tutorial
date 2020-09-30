import { Store } from 'redux';
import { IState, MainListContext, PollViewMode } from '../models/state';
import { setMainListLoadingEvent } from '../events/SetMainListLoadingEvent';
import { setMainListContextEvent } from '../events/SetMainListContextEvent';
import { setMainListDataEvent } from '../events/SetMainListDataEvent';
import { createPollInProgressEvent } from '../events/CreatePollInProgressEvent';
import { resetCreatePollModalEvent } from '../events/ResetCreatePollModalEvent';
import { pollViewModeEvent } from '../events/PollViewModeEvent';
import { setPollResponsesEvent } from '../events/SetPollResponsesEvent';
import { setPollResultsEvent } from '../events/SetPollResultsEvent';
import { IApiService } from './ApiService';

export interface IPollsService {
  openPollsList(): Promise<void>;

  submitCreatePoll(): Promise<void>;

  viewPollResponses(pollId: string, viewMode: PollViewMode): Promise<void>;

  deletePoll(pollId: string): Promise<void>;
}

export class PollsService implements IPollsService {

  constructor(private readonly store: Store<IState>, private readonly apiService: IApiService) { }

  async openPollsList(): Promise<void> {
    this.store.dispatch(setMainListLoadingEvent(true));
    this.store.dispatch(setMainListContextEvent(MainListContext.POLLS));

    const pollsResponse = await this.apiService.getAllPolls();
    this.store.dispatch(setMainListDataEvent(pollsResponse.items));
    this.store.dispatch(setMainListLoadingEvent(false));
  }

  async submitCreatePoll(): Promise<void> {
    this.store.dispatch(createPollInProgressEvent(true));
    const { title, options } = this.store.getState().createPollModal;
    await this.apiService.createPoll({
      userId: this.store.getState().activeUser.activeUserId as string,
      title,
      responses: options,
    });
    this.store.dispatch(createPollInProgressEvent(false));
    this.store.dispatch(resetCreatePollModalEvent());
    await this.openPollsList();
  }

  async viewPollResponses(pollId: string, viewMode: PollViewMode): Promise<void> {
    this.store.dispatch(pollViewModeEvent(viewMode));
    if (viewMode === PollViewMode.COUNT) {
      const { options } = await this.apiService.getPollResponsesCount(pollId);
      this.store.dispatch(setPollResultsEvent(options));
    } else if (viewMode === PollViewMode.ALL) {
      const { answers } = await this.apiService.getPollResponses(pollId);
      this.store.dispatch(setPollResponsesEvent(answers));
    }
  }

  async deletePoll(pollId: string): Promise<void> {
    await this.apiService.deletePoll(pollId);
    await this.openPollsList();
  }
}
