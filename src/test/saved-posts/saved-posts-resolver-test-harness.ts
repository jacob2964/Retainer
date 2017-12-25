import { SavedPostsResolver } from '../../app/saved-posts/saved-posts-resolver';
import { SavedPost } from '../../app/saved-posts/saved-post';
import { Any } from '../test-helpers/any';
import { ActivatedRouteSnapshot } from '@angular/router';
export class SavedPostsResolverTestHarness {

    _activatedRouteSnapshotMock: any = jasmine.createSpyObj('ActivatedRouteSnapshot', ['']);
    _redditConnectionServiceMock: any = jasmine.createSpyObj('RedditConnectionService', ['']);
    _localStorageMock: any = jasmine.createSpyObj('localStorage', ['']);

    withGoodState(route: ActivatedRouteSnapshot): SavedPostsResolverTestHarness {
        const localStorageMock = localStorage as any;
        spyOn(localStorageMock, 'getItem');
        localStorageMock.getItem.and.returnValue(route.queryParams['state']);
        this._activatedRouteSnapshotMock = route;
        this._localStorageMock = localStorageMock;

        return this;
    }

    withSavedPosts(savedPosts: SavedPost[]): SavedPostsResolverTestHarness {
        const redditConnectionServiceMock = jasmine.createSpyObj('RedditConnectionService', ['getUserPosts']);
        redditConnectionServiceMock.getUserPosts.and.returnValue(savedPosts);
        this._redditConnectionServiceMock = redditConnectionServiceMock;

        return this;
    }

    withBadState(route: ActivatedRouteSnapshot): SavedPostsResolverTestHarness {
        const localStorageMock = localStorage as any;
        spyOn(localStorageMock, 'getItem');
        localStorageMock.getItem.and.returnValue(Any.alphaNumericString);
        this._activatedRouteSnapshotMock = route;
        this._localStorageMock = localStorageMock;

        return this;
    }

    build() {
        return new SavedPostsResolver(this._redditConnectionServiceMock);
    }
}