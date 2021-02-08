export function AutoUnsubscribe(constructor: any) {

  const original = constructor.prototype.ngOnDestroy;

  constructor.prototype.ngOnDestroy = function () {
    if (this.subscriptions) {
      for (let sub of this.subscriptions) {
        sub.unsubscribe();
      }
    }
    original && typeof original === "function" && original.apply(this, arguments);
  };

}
