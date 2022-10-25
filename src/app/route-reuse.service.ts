import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

export class ReuseService implements RouteReuseStrategy {
    storedRouteHandles = new Map<string, DetachedRouteHandle>();
    //用来判断跳转时是否需要存储页面
    from = '';
    to = '';
    //用来判断跳转时是否要读取之前存储的页面
    reuseFrom = '';
    reuseTo = '';

    shouldReuseRoute(from: ActivatedRouteSnapshot, to: ActivatedRouteSnapshot): boolean {
        if (from.routeConfig) {
            this.from = this.getPath(from);
        }
        if (to.routeConfig) {
            this.to = this.getPath(to);
        }
        return from.routeConfig === to.routeConfig;
    }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // 判断是否执行store
        const f = (this.from === 'a' && this.to === 'c') || (this.from === 'b' && this.to === 'c');
        if (f) {
            this.reuseFrom = this.to;
            this.reuseTo = this.from;
        }
        return f;
    }

    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
        // 进行路由复用存储
        this.storedRouteHandles.set(this.getPath(route), detachedTree);
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        if (this.from === this.reuseFrom && this.to === this.reuseTo) {
            // 读取路由复用
            return this.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle;
        } else {
            return null;
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        if (this.reuseFrom && this.reuseTo && this.from && this.to) {
            return this.from === this.reuseFrom && this.to === this.reuseTo;
        } else {
            return false;
        }
    }

    private getPath(route: ActivatedRouteSnapshot): string {
        // 截取路由地址中最小子节点
        let _routerState =  '/' + route.pathFromRoot
        .filter(v => v.routeConfig)
        .map(v => v.routeConfig!.path)
        .join('/');
        let url = _routerState.split('/');
        return url[url.length - 1].split('?')[0];
    }
}
